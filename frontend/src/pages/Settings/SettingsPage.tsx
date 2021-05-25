import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { ContactsContext } from "../../context/ContactsContext";
import { OrdersContext } from "../../context/OrdersContext";
import { ReceiptContext } from "../../context/ReceiptContext";
import CloseIcon from "@material-ui/icons/Close";
import { UserSettingsContext } from "../../context/UserSettingsContext";

const useStyles = makeStyles({
  Container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    margin: "3rem",
  },
});

function SettingsPage({
  history,
}: import("react-router-dom").RouteChildrenProps) {
  const { setOrders } = useContext(OrdersContext);
  const classes = useStyles();
  const { setContacts } = useContext(ContactsContext);
  const { setReceipts } = useContext(ReceiptContext);
  const usersettingscontext = useContext(UserSettingsContext);

  // Fake Data
  const setFakeData = () => {
    resetAll();
    setOrders([
      {
        id: 0,
        name: "Krzesło z bzu x2",
        desc: "proste krzesło z bzu, zaokrąglone oparcie, siedzisko z plecionki",
        notes: "Kolor czarny",
        price_value: 40000,
        is_price_paid: false,
        advance_value: 10000,
        is_advance_paid: false,
        date_of_completion: new Date("2020-09-11T10:00:00.000Z"),
        est_date_of_completion: new Date("2020-09-11T10:00:00.000Z"),
        date_of_issue: new Date("2020-11-09T01:36:30.373Z"),
        client_id: 0,
        shopping_list_id: 0,
        is_abandoned: false,
        is_completed: false,
      },
      {
        id: 1,
        name: "Stół",
        desc: "Stół z nie powyłamywanymi nogami z sosny",
        notes: "Kolor niebieski",
        price_value: 60000,
        is_price_paid: false,
        advance_value: 30000,
        is_advance_paid: true,
        date_of_completion: new Date("2020-09-30T10:00:00.000Z"),
        est_date_of_completion: new Date("2020-09-30T10:00:00.000Z"),
        date_of_issue: new Date("2020-11-09T00:36:10.316Z"),
        client_id: 1,
        shopping_list_id: 1,
        is_abandoned: false,
        is_completed: false,
      },
      {
        id: 2,
        name: "Ławka",
        desc: 'Ławka sosnowa w stylu "T"',
        notes: "Zaokrąglone nogi",
        price_value: 80000,
        is_price_paid: true,
        advance_value: 40000,
        is_advance_paid: true,
        date_of_completion: new Date("2020-09-15T10:00:00.000Z"),
        est_date_of_completion: new Date("2020-09-15T10:00:00.000Z"),
        date_of_issue: new Date("2020-11-09T00:37:17.341Z"),
        client_id: 2,
        shopping_list_id: 2,
        is_abandoned: false,
        is_completed: false,
      },
    ]);

    setContacts([
      {
        id: 0,
        firstname: "Jan",
        lastname: "Kowalski",
        tel: "730 495 950",
        email: "test@gmail.com",
        is_good: true,
      },
      {
        id: 1,
        firstname: "Adam",
        lastname: "Nowak",
        tel: "730 123 950",
        email: "test1@gmail.com",
        is_good: true,
      },
      {
        id: 2,
        firstname: "Kuba",
        lastname: "Kowalski",
        tel: "730 434 950",
        email: "test2@gmail.com",
        is_good: false,
      },
      {
        firstname: "Mateusz ",
        lastname: "Kowalski",
        tel: "234 567 89",
        email: "test@gmail.com",
        is_good: true,
        id: 3,
      },
      {
        firstname: "Łukasz",
        lastname: "Kowalski",
        tel: "456 784 798",
        email: "test@gmail.com",
        is_good: true,
        id: 4,
      },
      {
        firstname: "Adrian",
        lastname: "",
        tel: "",
        email: "",
        is_good: true,
        id: 5,
      },
    ]);

    setReceipts([
      {
        name: "Order: Krzesło z bzu x2",
        budget: 30000,
        items: [
          { id: 0, amount: 10, name: "Wood 2x4", is_bought: false },
          { id: 1, amount: 1, name: "Glue", is_bought: false },
        ],
        id: 0,
        order_id: null,
        completed: false,
      },
      {
        id: 1,
        name: "Order: Stół",
        completed: false,
        order_id: 1,
        items: [
          { id: 0, amount: 10, name: "Wood Plank 2x2m", is_bought: false },
          { id: 1, amount: 30, name: "Screws 5cm", is_bought: false },
          { id: 2, amount: 100, name: "Screws 3cm", is_bought: true },
        ],
        budget: 50000,
      },
      {
        id: 2,
        name: "Order: Ławka",
        completed: true,
        order_id: 2,
        items: [
          { id: 0, amount: 10, name: "Wood Plank 1x4m", is_bought: true },
          { id: 1, amount: 50, name: "Screws 7cm", is_bought: true },
        ],
        budget: 70000,
        money_spent: 10000,
      },
    ]);
    //   addContact({
    //     id: 0,
    //     name: "Jan",
    //     lastname: "Kowalski",
    //     tel: "730 495 950",
    //     email: "test@gmail.com",
    //     is_good: true,
    //   })
    //   addContact({
    //     id: 1,
    //     name: "Adam",
    //     lastname: "Nowak",
    //     tel: "730 123 950",
    //     email: "test1@gmail.com",
    //     is_good: true,
    //   })
    //   addContact({
    //     id: 2,
    //     name: "Kuba",
    //     lastname: "Kowalski",
    //     tel: "730 434 950",
    //     email: "test2@gmail.com",
    //     is_good: false,
    //   })
    //   addReceipt({
    //     id: 0,
    //     name: "test0",
    //     order_id: 0,
    //     budget: 30000,
    //     completed: false,
    //     items: [
    //       { id: 0, amount: 10, name: "Wood 2x4", is_bought: false },
    //       { id: 1, amount: 1, name: "Glue", is_bought: false },
    //     ],
    //   })
    //   addReceipt({
    //     id: 1,
    //     name: "test1",
    //     order_id: 1,
    //     budget: 50000,
    //     completed: true,
    //     items: [
    //       { id: 0, amount: 10, name: "Wood Plank 2x2m", is_bought: false },
    //       { id: 1, amount: 30, name: "Screws 5cm", is_bought: false },
    //       { id: 2, amount: 100, name: "Screws 3cm", is_bought: true },
    //     ],
    //   })
    //   addReceipt({
    //     id: 2,
    //     name: "test2",
    //     order_id: 2,
    //     budget: 70000,
    //     completed: false,
    //     items: [
    //       { id: 0, amount: 10, name: "Wood Plank 1x4m", is_bought: false },
    //       { id: 1, amount: 50, name: "Screws 7cm", is_bought: false },
    //     ],
    //   })
    //   addOrder({
    //     id: 0,
    //     name: "Krzesłox2",
    //     desc: "Krzesłox2",
    //     advance_value: 10000,
    //     price_value: 40000,
    //     is_price_paid: false,
    //     is_advance_paid: false,
    //     client_id: 0,
    //     notes: "",
    //     est_date_of_completion: faker.date.future(),
    //     date_of_issue: faker.date.recent(),
    //     date_of_completion: null,
    //     is_abandoned: false,
    //     is_completed: false,
    //     shopping_list_id: 0,
    //   })
    //   addOrder({
    //     id: 1,
    //     name: "Stół",
    //     desc: "Stół",
    //     advance_value: 30000,
    //     price_value: 60000,
    //     is_price_paid: false,
    //     is_advance_paid: true,
    //     client_id: 1,
    //     notes: "Drewno z Lipy",
    //     est_date_of_completion: faker.date.future(),
    //     date_of_issue: faker.date.recent(),
    //     date_of_completion: null,
    //     is_abandoned: false,
    //     is_completed: true,
    //     shopping_list_id: 1,
    //   })
    //   addOrder({
    //     id: 2,
    //     name: "Ławka",
    //     desc: "Ławka",
    //     advance_value: 40000,
    //     price_value: 80000,
    //     is_price_paid: true,
    //     is_advance_paid: true,
    //     client_id: 2,
    //     notes: "Zaokrąglone nogi",
    //     est_date_of_completion: faker.date.future(),
    //     date_of_issue: faker.date.recent(),
    //     date_of_completion: null,
    //     is_abandoned: false,
    //     is_completed: false,
    //     shopping_list_id: 2,
    //   })
  };

  const resetAll = () => {
    setOrders([]);
    setReceipts([]);
    setContacts([]);
  };
  return (
    <Dialog open fullScreen>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={() => {
              history.goBack();
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Settings</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.Container}>
        <Button onClick={resetAll} variant="contained">
          Remove all data
        </Button>
        <Button onClick={setFakeData} variant="contained">
          Set fake data
        </Button>
        <Button onClick={usersettingscontext.singout} variant="contained">
          Sing OUT
        </Button>
      </div>

      {JSON.stringify(usersettingscontext.userdata)
        .split(",")
        .map((data, index) => (
          <Typography key={`usersettings_userData${index}`}>{data}</Typography>
        ))}
    </Dialog>
  );
}

export default SettingsPage;
