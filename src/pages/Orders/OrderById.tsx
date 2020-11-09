import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import ReceiptCardContent from "../../components/ReceiptCardContent"
import { OrdersContext } from "../../context/OrdersContext"
import { ReceiptContext } from "../../context/ReceiptContext"

//icons
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"
import NoteIcon from "@material-ui/icons/Note"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import MoneyOffIcon from "@material-ui/icons/MoneyOff"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import { OrderProps } from "../../context/OrdersReducer"
import dateToString from "../../helpers/dateToString"
import Receipt from "../../components/Receipt"
import { ContactsContext } from "../../context/ContactsContext"
import ContactListItem from "../../components/ContactListItem"

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
  timeContianer: {
    display: "flex",
    gap: "0.5em",
  },
  cardMoneyIcon: {
    marginLeft: "auto",
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
}))

function OrderById({ match }: import("react-router-dom").RouteChildrenProps) {
  const classes = useStyles()
  const { receipts } = useContext(ReceiptContext)
  const { orders } = useContext(OrdersContext)
  const { contacts } = useContext(ContactsContext)

  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [showReceipt, setShowReceipt] = useState<boolean>(false)
  const [order, setOrder] = useState<OrderProps>({
    id: -1,
    name: "",
    desc: "",
    notes: "",
    price_value: 0,
    is_price_paid: false,
    advance_value: 0,
    is_advance_paid: false,
    is_anbandoned: false,
    is_completed: false,
    date_of_completion: null,
    est_date_of_completion: new Date(),
    date_of_issue: new Date(),
    client_id: 0,
    shopping_list_id: null,
  })
  useEffect(() => {
    if ((match?.params as { id: string }).id !== undefined) {
      const id: number = parseInt((match?.params as { id: string }).id)
      console.log(id, orders)
      if (orders[id]) setOrder(orders[id])
    }
  })

  if (order.id >= 0)
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent className={classes.timeContianer}>
            <Typography variant="h6" color="textPrimary" component="h1">
              {order.name}
            </Typography>
            <div className={classes.cardMoneyIcon}>
              {order.is_price_paid && order.is_advance_paid && (
                <MonetizationOnIcon htmlColor="#388E3C" />
              )}
              {!order.is_advance_paid && !order.is_price_paid && (
                <MoneyOffIcon htmlColor="#D32F2F" />
              )}
              {!order.is_price_paid && order.is_advance_paid && (
                <AttachMoneyIcon htmlColor="#F57C00" />
              )}
            </div>
          </CardContent>
          <Divider />
          <CardContent className={classes.timeContianer}>
            <AccessAlarmIcon />
            <Typography variant="subtitle1" component="h2">
              {order.est_date_of_completion?.toLocaleString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
              {order.desc}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        {/* <CardActions className={classes.cardActionsContainer}>
          <Button size="small" color="primary">
            Edytuj
          </Button>
          <Button size="small" color="primary">
            Zmień status
          </Button>
        </CardActions> */}
        {order.notes.length > 0 && (
          <>
            <Divider />
            <CardContent className={classes.cardNotes}>
              <Typography variant="body2" color="textPrimary" component="p">
                Notes: {order.notes}
              </Typography>
            </CardContent>
          </>
        )}
        {order.shopping_list_id !== undefined &&
          order.shopping_list_id !== null && (
            <>
              <Divider />
              <CardContent>
                <Receipt {...receipts[order.shopping_list_id]} />
              </CardContent>
            </>
          )}
        <Divider />
        <CardContent>
          <List>
            <Divider />

            <ListItemText
              primary={`Date of completion: ${
                order.date_of_completion !== null
                  ? dateToString(order.date_of_completion)
                  : "Not set"
              }`}
            />

            <Divider />

            <ListItemText
              primary={`Estimated date of completion: ${
                order.est_date_of_completion
                  ? dateToString(order.est_date_of_completion)
                  : "Not set"
              }`}
            />
            <Divider />

            <ListItemText
              primary={`Date_of_issue: ${dateToString(order.date_of_issue)}`}
            />
            <Divider />

            <ListItemText
              primary={`Is completed: ${order.is_completed ? "Yes" : "No"} `}
            />
            <ListItemText
              primary={`Is anbandoned: ${order.is_anbandoned ? "Yes" : "No"}`}
            />
            <Divider />

            <ListItemText
              primary={`Price value: ${
                order.price_value !== null &&
                (order.price_value / 100.0).toFixed(2)
              }`}
            />
            <ListItemText
              primary={`Is advance paid: ${
                order.is_advance_paid ? "Yes" : "No"
              }`}
            />
            <Divider />

            <ListItemText
              primary={`Advance value: ${
                order.advance_value !== null &&
                (order.advance_value / 100.0).toFixed(2)
              }`}
            />
            <ListItemText
              primary={`Is price paid: ${order.is_price_paid ? "Yes" : "No"}`}
            />
            <Divider />
            <ContactListItem contact={contacts[order.client_id]} />
          </List>
        </CardContent>
      </Card>
    )
  else return <div>404</div>
}

export default OrderById
