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
}))

function ReceiptCardContent(receipt: ReceiptProps) {
  const classes = useStyle()
  const [showList, setShowList] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const toggleList = () => {
    setShowList((value) => !value)
  }

  const toggleChecked = () => {
    setChecked((value) => !value)
  }

  return (
    <>
      <CardActionArea onClick={toggleChecked}>
        <CardContent>
          <div className={classes.timeContianer}>
            <ReceiptIcon color="primary" />
            <Typography variant="subtitle1" component="h2" display="inline">
              {receipt.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
              display="inline"
              color="textSecondary"
            >
              {receipt.budget && (receipt.budget / 100.0).toFixed(2) + "zł"}
            </Typography>
            <div className={classes.cardActionQuickButton}></div>
            {checked ? (
              <CheckBoxIcon htmlColor="#388E3C" fontSize="large" />
            ) : (
              <CheckBoxOutlineBlankIcon htmlColor="#757575" fontSize="large" />
            )}
          </div>
        </CardContent>
      </CardActionArea>
      <Divider />
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
        <div className={classes.cardActionQuickButton}></div>
        <Button size="small" color="primary">
          Edytuj
        </Button>
      </CardActions>
      <Collapse in={showList}>
        <CardContent>
          <Receipt {...receipt} />
        </CardContent>
      </Collapse>
    </>
  )
}

export default ReceiptCardContent