import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { memo, useContext, useState } from "react"
import { OrderProps } from "../context/OrdersReducer"
import { ReceiptContext } from "../context/ReceiptContext"
import ReceiptCardContent from "./ReceiptCardContent"
import { UserSettingsContext } from "../context/UserSettingsContext"
import Receipt from "./Receipt"
import objectsHaveSameData from "../helpers/objectsHaveSameData"

//icons
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"
import NoteIcon from "@material-ui/icons/Note"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn"
import MoneyOffIcon from "@material-ui/icons/MoneyOff"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import clsx from "clsx"

const useStyle = makeStyles((theme) => ({
  card: {
    width: "100%",
  },
  title: {
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
  success: {
    backgroundColor: "#C8E6C9",
  },
  error: {
    backgroundColor: "#FFCDD2",
  },
}))

function OrderCard({
  id,
  name,
  desc,
  notes,
  est_date_of_completion,
  date_of_completion,
  client_id,
  is_advance_paid,
  is_price_paid,
  shopping_list_id,
  is_anbandoned,
  is_completed,
  onClick,
  onEditClick,
}: OrderProps & {
  onClick: (id: number) => void
  onEditClick: (id: number) => void
}) {
  const { receipts } = useContext(ReceiptContext)
  const { expand_shopping_list_in_orders } = useContext(UserSettingsContext)
  const classes = useStyle()
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [showReceipt, setShowReceipt] = useState<boolean>(false)

  const toggleNotes = () => {
    setShowNotes((prevState) => !prevState)
  }

  const toggleReceipt = () => {
    setShowReceipt((prevState) => !prevState)
  }

  let classForHeader = classes.title
  if (is_completed) classForHeader = clsx(classes.title, classes.success)
  if (is_anbandoned) classForHeader = clsx(classes.title, classes.error)

  console.log(classForHeader)

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => onClick(id)}>
        <CardContent className={classForHeader}>
          <Typography variant="h6" color="textPrimary" component="h1">
            {name}
          </Typography>
          <div className={classes.cardMoneyIcon}>
            {is_price_paid && is_advance_paid && (
              <MonetizationOnIcon htmlColor="#388E3C" />
            )}
            {!is_advance_paid && !is_price_paid && (
              <MoneyOffIcon htmlColor="#D32F2F" />
            )}
            {!is_price_paid && is_advance_paid && (
              <AttachMoneyIcon htmlColor="#F57C00" />
            )}
          </div>
        </CardContent>
        <Divider />
        <CardContent className={classes.title}>
          <AccessAlarmIcon />
          <Typography variant="subtitle1" component="h2">
            {est_date_of_completion?.toLocaleString(undefined, {
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
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions className={classes.cardActionsContainer}>
        <Button size="small" color="primary" onClick={() => onEditClick(id)}>
          Edytuj
        </Button>
        {/* <Button size="small" color="primary">
          Zmień status
        </Button> */}
        <div className={classes.cardActionQuickButton}></div>
        {notes.length > 0 && (
          <IconButton aria-label="notes" onClick={toggleNotes}>
            <NoteIcon htmlColor={showNotes ? "#3f51b5" : "#757575"} />
          </IconButton>
        )}
        {shopping_list_id !== null && (
          <IconButton aria-label="notes" onClick={toggleReceipt}>
            <ShoppingCartIcon htmlColor={showReceipt ? "#3f51b5" : "#757575"} />
          </IconButton>
        )}
      </CardActions>
      <Collapse in={showNotes && notes.length > 0}>
        <Divider />
        <CardContent className={classes.cardNotes}>
          <Typography variant="body2" color="textPrimary" component="p">
            {notes}
          </Typography>
        </CardContent>
      </Collapse>
      {shopping_list_id !== null && (
        <Collapse in={showReceipt}>
          <Divider />
          <CardContent>
            {expand_shopping_list_in_orders ? (
              <Receipt {...receipts[shopping_list_id]} />
            ) : (
              <ReceiptCardContent receipt={receipts[shopping_list_id]} />
            )}
          </CardContent>
        </Collapse>
      )}
    </Card>
  )
}

export default memo(OrderCard, (prevProps, nextProps) => {
  return objectsHaveSameData(prevProps, nextProps)
})
