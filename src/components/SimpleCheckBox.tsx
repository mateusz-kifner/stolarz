import { Button, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"

const useStyles = makeStyles({
  alignLeft: {
    display: "flex",
    justifyContent: "flex-start",
    textTransform: "none",
  },
  margin: {
    margin: "0.5rem",
  },
})

type SimpleCheckBoxProps = {
  value?: boolean
  onChange?: (value: boolean) => void
  text?: string
}
function SimpleCheckBox({ value, onChange, text }: SimpleCheckBoxProps) {
  const classes = useStyles()
  return (
    <Button
      onClick={() => onChange && onChange(value ? false : true)}
      className={classes.alignLeft}
      fullWidth
    >
      {value ? (
        <CheckBoxIcon htmlColor="#757575" className={classes.margin} />
      ) : (
        <CheckBoxOutlineBlankIcon
          htmlColor="#757575"
          className={classes.margin}
        />
      )}
      <Typography variant="body2">{text && text}</Typography>
    </Button>
  )
}

export default SimpleCheckBox
