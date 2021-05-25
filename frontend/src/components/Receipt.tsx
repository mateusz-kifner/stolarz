import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ReceiptProps } from "../context/ReceiptReducer";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { v4 as uuidv4 } from "uuid";

function Receipt(
  receipt: ReceiptProps & {
    selectable?: boolean;
    onSelect?: (item: any) => void;
    checkbox?: boolean;
  }
) {
  return (
    <List dense>
      {receipt.items &&
        receipt.items
          .filter((data) => data !== undefined)
          .map((item) => {
            return (
              <ListItem
                key={uuidv4()}
                button
                onClick={() => receipt.onSelect && receipt.onSelect(item)}
              >
                <ListItemIcon>
                  {item.is_bought ? (
                    receipt.checkbox ? (
                      <CheckBoxIcon htmlColor="#388E3C" />
                    ) : (
                      <CheckIcon htmlColor="#388E3C" />
                    )
                  ) : receipt.checkbox ? (
                    <CheckBoxOutlineBlankIcon htmlColor="disabled" />
                  ) : (
                    <CloseIcon htmlColor="disabled" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={` x${item.amount}`}
                  primaryTypographyProps={{ display: "inline" }}
                  secondaryTypographyProps={{ display: "inline" }}
                />
              </ListItem>
            );
          })}
    </List>
  );
}

export default Receipt;
