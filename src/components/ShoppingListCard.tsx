import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import NoteIcon from '@material-ui/icons/Note';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { OrderProps } from '../context/OrdersReducer';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { ShoppingListProps } from '../context/ShoppingListReducer';


const useStyle = makeStyles((theme)=>({
    card:{
        width:"100%",
    },
    timeContianer:{
        display:"flex",
        gap:"0.5em",
    },
    cardMoneyIcon:{
        marginLeft:"auto"
    },
    cardActionsContainer:{
        display:"flex",
        width:"100%"
    },
    cardActionQuickButton:{
        marginLeft:"auto !important" 
    },
    cardNotes:{
        backgroundColor: theme.palette.grey[50]
    }
}))

function ShoppingListCard({id,name,budget,completed,items,order_id}:ShoppingListProps) {
    const classes = useStyle();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <div className={classes.timeContianer}>
                        <AccessAlarmIcon />
                        <Typography variant="subtitle1" component="h2">
                            {name}   
                        </Typography>
                       
                    </div>
                </CardContent>
                <Divider/>
                <CardContent>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {budget && budget/100}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Divider/>
            <CardActions className={classes.cardActionsContainer}>
                <Button size="small" color="primary">
                    Edytuj
                </Button>
                <Button size="small" color="primary">
                    Zmień status
                </Button>
            </CardActions>
        </Card>
    )
}

export default ShoppingListCard
