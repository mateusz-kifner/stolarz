import { Fab, List, ListItem, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import OrderCard from "../../components/OrderCard";
import AddIcon from "@material-ui/icons/Add";
import { OrdersContext } from "../../context/OrdersContext";

const useStyles = makeStyles((theme) => ({
  ordersContainer: {
    height: "100%",
    position: "relative",
  },
  listContainer: {
    height: "100%",
    overflowY: "scroll",
    maxWidth: theme.breakpoints.values.md,
    marginLeft: "auto",
    marginRight: "auto",
  },
  flotingAdd: {
    position: "absolute",
    bottom: "5vmin",
    right: "5vmin",
  },
  bottomMargin: {
    marginBottom: "10vmin",
    display: "block",
  },
}));

function OrdersPage({
  history,
}: import("react-router-dom").RouteChildrenProps) {
  const { orders } = useContext(OrdersContext);
  const classes = useStyles();
  const goToAddPage = () => {
    history.push("/Orders/Add");
  };

  return (
    <div className={classes.ordersContainer}>
      <List className={classes.listContainer}>
        {orders
          .filter((value) => value !== undefined && !value.is_completed)
          .sort((prevVal, val) => {
            return val.id - prevVal.id;
          })
          .concat(
            orders
              .filter((value) => value !== undefined && value.is_completed)
              .sort((prevVal, val) => {
                return val.id - prevVal.id;
              })
          )
          .map((value) => {
            return (
              <ListItem key={"OrderPage" + value.id}>
                <OrderCard
                  {...value}
                  onClick={(id) => {
                    history.push("/Orders/Id/" + id);
                  }}
                  onEditClick={(id) => {
                    console.log(id);
                    history.push("/Orders/Edit/" + id);
                  }}
                />
              </ListItem>
            );
          })}
        <ListItem
          key={"OrdersPageBottomMargin"}
          className={classes.bottomMargin}
        ></ListItem>
      </List>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.flotingAdd}
        onClick={goToAddPage}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default OrdersPage;
