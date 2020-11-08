import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React from "react"
import MenuIcon from "@material-ui/icons/Menu"
import MoreIcon from "@material-ui/icons/MoreVert"
import ContactsIcon from "@material-ui/icons/Contacts"

function TopBar({
  location,
  history,
  Action,
}: import("react-router-dom").RouteChildrenProps & { Action?: React.FC }) {
  const goToSettings = () => {
    history.push("/Settings")
  }
  const goToContacts = () => {
    history.push("/Contacts")
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={goToSettings}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" noWrap>
              {location.pathname.split("/")[1]}
            </Typography>
          </Grid>
          <Grid item>{Action && <Action />}</Grid>
          <Grid item>
            <IconButton color="inherit" onClick={goToContacts}>
              <ContactsIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
