import {
  AppBar,
  Card,
  CardContent,
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
    maxWidth: theme.breakpoints.values.md,
    minWidth: "50%",
    // width: theme.breakpoints.values.md,
    // maxHeight: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  },
  Contianer: {
    display: "flex",
    gap: "1em",
    // flexDirection: "column",
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
        <Card className={classes.card}>
          <CardContent>
            <ContactListItem contact={contacts[order.client_id]} />
          </CardContent>
          <Divider />

          <CardContent className={classes.Contianer}>
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
          <CardContent className={clsx(classes.Contianer, classes.flexColumn)}>
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
          <CardContent className={clsx(classes.Contianer, classes.flexColumn)}>
            <Typography
              variant="body1"
              color="textPrimary"
              component="div"
              gutterBottom
            >
              Price value:
              {order.price_value !== null &&
                (order.price_value / 100.0).toFixed(2)}
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
              Advance value:
              {order.advance_value !== null &&
                (order.advance_value / 100.0).toFixed(2)}
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
              value={order.is_anbandoned}
              onChange={(value) =>
                changeOrder({ ...order, is_anbandoned: value })
              }
              text=" Is anbandoned"
            />
            <Divider />
          </CardContent>
        </Card>
      </Dialog>
    )
  else return <div>404</div>
}

export default OrderById
