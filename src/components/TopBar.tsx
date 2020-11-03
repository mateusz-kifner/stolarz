import { AppBar, Grid, IconButton, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

function TopBar({location}:import('react-router-dom').RouteChildrenProps) {
    return (
        <AppBar position="static">
        <Toolbar>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                 </Grid>
                <Grid item xs>
                    <Typography  variant="h6" noWrap>
                        {location.pathname.split("/")[1]}
                    </Typography>
                </Grid>
          
                {/* <Grid item>
                    <IconButton
                    aria-label="show more"
                    aria-haspopup="true"
                    color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </Grid> */}
            </Grid>
        </Toolbar>
      </AppBar>
    )
}

export default TopBar
