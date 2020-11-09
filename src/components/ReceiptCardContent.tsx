import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React, { useState } from "react"
import { ReceiptProps } from "../context/ReceiptReducer"
import Receipt from "./Receipt"
import { Collapse } from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import ReceiptIcon from "@material-ui/icons/Receipt"
const useStyle = makeStyles((theme) => ({
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
  completed: {
    backgroundColor: "#AED581",
  },
  money: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100%",
  },
}))

type ReceiptCardContentProps = {
  receipt: ReceiptProps
  checked?: boolean
  onCheck?: (id: number) => void
  onEditClick?: (id: number) => void
  onItemCheck?: (receiptId: number, itemid: number) => void
  checkbox?: boolean
}

function ReceiptCardContent({
  receipt,
  onCheck,
  checked,
  onItemCheck,
  onEditClick,
  checkbox,
}: ReceiptCardContentProps) {
  const classes = useStyle()
  const [showList, setShowList] = useState<boolean>(onItemCheck !== undefined)
  const toggleList = () => {
    setShowList((value) => !value)
  }

  return (
    <>
      <CardActionArea
        onClick={() =>
          onCheck && receipt.id !== undefined && onCheck(receipt.id)
        }
      >
        <CardContent className={receipt.completed ? classes.completed : ""}>
          <div className={classes.timeContianer}>
            <ReceiptIcon color="primary" />
            <Typography variant="subtitle1" component="h2" display="inline">
              {receipt.name}
            </Typography>
            <div className={classes.cardActionQuickButton}></div>

            <div className={classes.money}>
              <Typography
                variant="subtitle1"
                component="h2"
                display="inline"
                color="textSecondary"
              >
                {receipt.budget && (receipt.budget / 100.0).toFixed(2) + "zł"}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h2"
                display="inline"
                color="secondary"
              >
                {receipt.money_spent &&
                  " -" + (receipt.money_spent / 100.0).toFixed(2) + "zł"}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h2"
                display="inline"
                color={
                  receipt.budget && receipt.money_spent
                    ? receipt.budget - receipt.money_spent > 0
                      ? "primary"
                      : "secondary"
                    : "textSecondary"
                }
              >
                {receipt.money_spent &&
                  receipt.budget &&
                  " = " +
                    ((receipt.budget - receipt.money_spent) / 100.0).toFixed(
                      2,
                    ) +
                    "zł"}
              </Typography>
            </div>
            <div className={classes.cardActionQuickButton}></div>
            {onCheck && (
              <>
                {checked ? (
                  <CheckBoxIcon htmlColor="#388E3C" fontSize="large" />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    htmlColor="#757575"
                    fontSize="large"
                  />
                )}
              </>
            )}
          </div>
        </CardContent>
      </CardActionArea>
      <Divider />
      {onItemCheck === undefined && (
        <CardActions className={classes.cardActionsContainer}>
          <Button size="small" color="primary" onClick={toggleList}>
            {showList ? (
              <>
                Hide List
                <ExpandLessIcon />
              </>
            ) : (
              <>
                Show List
                <ExpandMoreIcon />
              </>
            )}
          </Button>
          {/* <div className={classes.cardActionQuickButton}></div> */}
          <Button
            size="small"
            color="primary"
            onClick={() => {
              console.log("test", receipt.id)
              console.log(onEditClick)
              onEditClick && receipt.id !== undefined && onEditClick(receipt.id)
            }}
          >
            Edytuj
          </Button>
        </CardActions>
      )}
      <Collapse in={showList}>
        <CardContent>
          <Receipt
            {...receipt}
            onSelect={(item) => {
              onItemCheck &&
                receipt.id !== undefined &&
                onItemCheck(receipt.id, item.id)
            }}
            checkbox={checkbox}
          />
        </CardContent>
      </Collapse>
    </>
  )
}

export default ReceiptCardContent
