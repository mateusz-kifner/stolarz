import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  Container,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useContext } from "react"
import { OrdersContext } from "../../context/OrdersContext"
import { ReceiptContext } from "../../context/ReceiptContext"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts"

const useStyles = makeStyles((theme) => {
  const borderColor =
    theme.palette.type === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)"

  return {
    outline: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      borderWidth: 1,
      borderColor: borderColor,
      borderStyle: "solid",
      padding: "18.5px 14px",
      display: "flex",
      gap: "0.5rem",
      justifyContent: "start",
      "@media (hover: none)": {
        "&:hover": {
          borderColor,
        },
      },
      "&:hover": {
        borderColor: theme.palette.text.primary,
      },
      "&:focused": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
    outlineLabel: {
      backgroundColor: theme.palette.common.white,
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
    },
    divider: {
      height: "1rem",
    },

    card: {
      width: "100%",
    },

    cardActionsContainer: {
      display: "flex",
      width: "100%",
    },
    cardActionQuickButton: {
      marginLeft: "auto !important",
    },
    cardNotes: {
      backgroundColor: theme.palette.grey[50],
    },
    container: {
      margin: "3rem",
    },
  }
})

function FinancePage() {
  const classes = useStyles()
  const { receipts } = useContext(ReceiptContext)
  const { orders } = useContext(OrdersContext)

  const total_gained = orders
    .filter((order) => order.is_completed)
    .map((order) => (order.price_value !== null ? order.price_value : 0))
    .reduce((prevNum: number, num: number) => prevNum + num, 0)

  const total_spent = orders
    .map((order) =>
      order.shopping_list_id !== null ? order.shopping_list_id : -1,
    )
    .filter((shopping_list_id) => shopping_list_id !== -1)
    .map((shopping_list_id) => receipts[shopping_list_id])
    .map((receipt) =>
      receipt.money_spent !== null && receipt.money_spent !== undefined
        ? receipt.money_spent
        : 0,
    )
    .reduce((prevNum: number, num: number) => prevNum + num, 0)

  const data = [
    {
      name: "Total",
      gained: total_gained / 100.0,
      spent: -total_spent / 100.0,
    },
  ]

  return (
    <Container maxWidth="md">
      <Card className={classes.container}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="h1">
            Finances {total_gained < 1 && total_spent < 1 && `(No data)`}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="subtitle2" component="h2" gutterBottom>
            Total gained: {(total_gained / 100.0).toFixed(2)} PLN
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="subtitle2" component="h2">
            Total spent: {(total_spent / 100.0).toFixed(2)} PLN
          </Typography>
        </CardContent>

        <CardContent>
          <Typography variant="subtitle1" component="h2">
            Total revenue: {((total_gained - total_spent) / 100.0).toFixed(2)}{" "}
            PLN
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="gained" fill="#8884d8" />
            <Bar dataKey="spent" fill="#82ca9d" />
          </BarChart>
        </CardContent>
      </Card>
    </Container>
  )
}

export default FinancePage
