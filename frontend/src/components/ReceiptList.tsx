import {
  IconButton,
  List,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Reducer, useEffect, useReducer, useState } from "react";
import { ReceiptItemProps, ReceiptProps } from "../context/ReceiptReducer";
import AddIcon from "@material-ui/icons/Add";
import ReceiptListItem from "./ReceiptListItem";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => {
  const borderColor =
    theme.palette.type === "light"
      ? "rgba(0, 0, 0, 0.23)"
      : "rgba(255, 255, 255, 0.23)";

  return {
    outline: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      borderWidth: 1,
      borderColor: borderColor,
      borderStyle: "solid",
      padding: "18.5px 14px",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      justifyContent: "start",
      "@media (hover: none)": {
        "&:hover": {
          borderColor,
        },
      },
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };
});

type Action =
  | { type: "add"; item: ReceiptItemProps }
  | { type: "remove"; id: number }
  | { type: "change"; item: ReceiptItemProps }
  | { type: "reset" };

function reducer(prevState: ReceiptItemProps[], action: Action) {
  switch (action.type) {
    case "reset":
      return [];
    case "add":
      if (action.item.name.length < 1) return prevState;
      if (!action.item.id) action.item.id = prevState.length;
      if (prevState.length < action.item.id) return prevState;
      for (let item of prevState) {
        if (item.name === action.item.name) {
          let changedItem = { ...item, amount: item.amount + 1, id: item.id };
          return prevState.map((item) => {
            if (item.id === changedItem.id) return changedItem;
            return item;
          });
        }
      }
      return [...prevState, action.item];

    case "remove":
      return prevState.filter((item) => {
        if (item.id === action.id) return false;
        return true;
      });
    case "change":
      if (action.item.amount < 1)
        return prevState.filter((item) => {
          if (item.id === action.item.id) return false;
          return true;
        });
      return prevState.map((item) => {
        if (item.id === action.item.id) return action.item;
        return item;
      });
    default:
      return prevState;
  }
}

type ReceiptListProps = {
  receipt: ReceiptProps;
  onChange: (event: any) => void;
};

function ReceiptList({ receipt, onChange }: ReceiptListProps) {
  const [uuid] = useState(uuidv4());
  const [items, dispatchItems] = useReducer<
    Reducer<ReceiptItemProps[], Action>
  >(reducer, []);
  const classes = useStyles();
  const [addfield, setAddfield] = useState<string>("");

  useEffect(() => {
    receipt.items.forEach((item) => {
      dispatchItems({ type: "add", item });
    });
  }, []);

  useEffect(() => {
    onChange(items);
  });

  useEffect(() => {
    dispatchItems({ type: "reset" });
    receipt.items.forEach((item) => {
      dispatchItems({ type: "add", item });
    });
  }, [receipt]);

  const incrementAmount = (item: ReceiptItemProps) => {
    dispatchItems({
      type: "change",
      item: { ...item, amount: item.amount + 1 },
    });
  };

  const decrementAmount = (item: ReceiptItemProps) => {
    if (item.amount > 0) {
      dispatchItems({
        type: "change",
        item: { ...item, amount: item.amount - 1 },
      });
    }
  };

  const toggleIsBought = (item: ReceiptItemProps) => {
    dispatchItems({
      type: "change",
      item: { ...item, is_bought: !item.is_bought },
    });
  };

  const addItem = (item: ReceiptItemProps) => {
    dispatchItems({ type: "add", item });
  };

  return (
    <div className={classes.outline}>
      <div className={classes.actions}>
        <TextField
          fullWidth
          name="additem"
          value={addfield}
          onChange={(e) => {
            setAddfield(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem({ name: addfield, amount: 1, is_bought: false });
            }
          }}
        />
        <IconButton
          aria-label="Add"
          onClick={() => {
            addItem({ name: addfield, amount: 1, is_bought: false });
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <List dense>
        {items.map((item, index) => {
          return (
            <ReceiptListItem
              item={item}
              toggleIsBought={toggleIsBought}
              incrementAmount={incrementAmount}
              decrementAmount={decrementAmount}
              key={uuid + index}
            />
          );
        })}
        {items.length < 1 && (
          <Typography variant="subtitle2" align="center">
            No items in receipt
          </Typography>
        )}
      </List>
    </div>
  );
}

export default ReceiptList;
