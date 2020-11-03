import { AppBar, Button, Dialog, Divider, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import CloseIcon from '@material-ui/icons/Close';

function OrdersAdd({history}:import("react-router-dom").RouteChildrenProps) {
    const goToOrders= ()=>{
        history.push("/Orders")
    }

    return (
        <Dialog fullScreen open={true} >
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit"  aria-label="close" onClick={goToOrders}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" >
              New Order
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
    )
}

export default OrdersAdd
