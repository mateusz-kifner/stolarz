import {
  AppBar,
  Card,
  CardContent,
  Container,
  Dialog,
  Divider,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../context/OrdersContext"
import { ReceiptContext } from "../../context/ReceiptContext"
import clsx from "clsx"
import { OrderProps } from "../../context/OrdersReducer"
import dateToString from "../../helpers/dateToString"
import Receipt from "../../components/Receipt"
import { ContactsContext } from "../../context/ContactsContext"
import ContactListItem from "../../components/ContactListItem"

//icons
// import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"
// import NoteIcon from "@material-ui/icons/Note"
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import MoneyOffIcon from "@material-ui/icons/MoneyOff"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import SimpleCheckBox from "../../components/SimpleCheckBox"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  Contianer: {
    display: "flex",
    gap: "1em",
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
  flexColumn: {
    flexDirection: "column",
  },
  halfOfWidth: {
    width: "50%",
  },
  MainContainer: {
    overflowY: "scroll",
  },
  success: {
    backgroundColor: "#C8E6C9",
  },
  error: {
    backgroundColor: "#FFCDD2",
  },
}))

function CenterLineText({ label, value }: { label: string; value: string }) {
  const classes = useStyles()
  return (
    <div className={classes.Contianer}>
      <Typography
        variant="body1"
        color="textSecondary"
        component="div"
        align="right"
        gutterBottom
        className={classes.halfOfWidth}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        color="textPrimary"
        component="div"
        gutterBottom
        className={classes.halfOfWidth}
      >
        {value}
      </Typography>
    </div>
  )
}

function OrderById({
  match,
  history,
}: import("react-router-dom").RouteChildrenProps) {
  const classes = useStyles()
  const { receipts } = useContext(ReceiptContext)
  const { orders, changeOrder } = useContext(OrdersContext)
  const { contacts } = useContext(ContactsContext)

  const [order, setOrder] = useState<OrderProps>({
    id: -1,
    name: "",
    desc: "",
    notes: "",
    price_value: 0,
    is_price_paid: false,
    advance_value: 0,
    is_advance_paid: false,
    is_abandoned: false,
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
  let classForHeader = classes.Contianer
  if (order.is_completed)
    classForHeader = clsx(classes.Contianer, classes.success)
  if (order.is_abandoned)
    classForHeader = clsx(classes.Contianer, classes.error)

  if (order.id >= 0)
    return (
      <Dialog open fullScreen>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={history.goBack}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6"></Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.MainContainer} maxWidth="md">
          <Card className={classes.card}>
            <CardContent>
              <ContactListItem contact={contacts[order.client_id]} />
            </CardContent>
            <Divider />

            <CardContent className={classForHeader}>
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

            <CardContent>
              <Typography variant="body1" color="textPrimary" component="div">
                {order.desc}
              </Typography>
            </CardContent>
            <Divider />

            {order.notes.length > 0 && (
              <>
                <Divider />
                <CardContent className={classes.cardNotes}>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="div"
                    gutterBottom
                  >
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

            <CardContent
              className={clsx(classes.Contianer, classes.flexColumn)}
            >
              <CenterLineText
                label="Date of completion:"
                value={
                  order.date_of_completion !== null
                    ? dateToString(order.date_of_completion)
                    : "Not set"
                }
              />

              <CenterLineText
                label="Estimated date of completion:"
                value={
                  order.est_date_of_completion
                    ? dateToString(order.est_date_of_completion)
                    : "Not set"
                }
              />

              <CenterLineText
                label="Date_of_issue:"
                value={dateToString(order.date_of_issue)}
              />

              <Divider />
            </CardContent>
            <CardContent
              className={clsx(classes.Contianer, classes.flexColumn)}
            >
              <Typography
                variant="body1"
                color="textPrimary"
                component="div"
                gutterBottom
              >
                {"Price: "}
                {order.price_value !== null &&
                  (order.price_value / 100.0).toFixed(2)}
                PLN
              </Typography>

              <SimpleCheckBox
                value={order.is_advance_paid}
                onChange={(value) =>
                  changeOrder({ ...order, is_advance_paid: value })
                }
                text=" Is advance paid"
              />
              <Divider />

              <Typography
                variant="body1"
                color="textPrimary"
                component="div"
                gutterBottom
              >
                {"Advance: "}
                {order.advance_value !== null &&
                  (order.advance_value / 100.0).toFixed(2)}
                PLN
              </Typography>
              <SimpleCheckBox
                value={order.is_price_paid}
                onChange={(value) =>
                  changeOrder({ ...order, is_price_paid: value })
                }
                text=" Is price paid"
              />
              <Divider />

              <SimpleCheckBox
                value={order.is_completed}
                onChange={(value) =>
                  changeOrder({ ...order, is_completed: value })
                }
                text=" Is completed"
              />
              <SimpleCheckBox
                value={order.is_abandoned}
                onChange={(value) =>
                  changeOrder({ ...order, is_abandoned: value })
                }
                text=" Is abandoned"
              />
            </CardContent>
          </Card>
        </Container>
      </Dialog>
    )
  else return <div>404</div>
}

export default OrderById
