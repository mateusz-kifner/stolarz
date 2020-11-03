import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import NoteIcon from '@material-ui/icons/Note';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { OrderProps } from '../context/OrdersReducer';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


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

function OrderCard({id,desc,notes,est_date_of_completion,date_of_completion,client_id,is_advance_paid,is_price_paid,shopping_list_id}:OrderProps) {
    const classes = useStyle();
    const [showNotes, setShowNotes] = useState<boolean>(false)
    const [showShoppingList, setShowShoppingList] = useState<boolean>(false)
    
    const toggleNotes=()=>{
        setShowNotes((prevState)=>(!prevState))
    }

    const toggleShoppingList = ()=>{
        setShowShoppingList((prevState)=>(!prevState))
    }
    
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardContent>
                    <div className={classes.timeContianer}>
                        <AccessAlarmIcon />
                        <Typography variant="subtitle1" component="h2">
                            {est_date_of_completion?.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                        </Typography>
                        <div className={classes.cardMoneyIcon}>
                        {is_price_paid && is_advance_paid && <MonetizationOnIcon htmlColor="#388E3C"/>}
                        {!(is_advance_paid) && !(is_price_paid) && <MoneyOffIcon htmlColor="#D32F2F"/>}
                        {!(is_price_paid) && is_advance_paid && <AttachMoneyIcon htmlColor="#F57C00"/>}
                        </div>
                    </div>
                </CardContent>
                <Divider/>
                <CardContent>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {desc}
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
                <div className={classes.cardActionQuickButton}></div>
                { notes.length > 0 && <IconButton aria-label="notes" onClick={toggleNotes}>
                    <NoteIcon htmlColor={showNotes ? "#3f51b5" : "#757575"}/>
                </IconButton>}
                { shopping_list_id != null && <IconButton aria-label="notes" onClick={toggleShoppingList}>
                    <ShoppingCartIcon htmlColor={showShoppingList ? "#3f51b5" : "#757575"}/>
                </IconButton>}
            </CardActions>
            {showNotes && notes.length > 0 && <>
            <Divider/>
            <CardContent className={classes.cardNotes} >
                <Typography variant="body2" color="textPrimary" component="p">
                    {notes}
                </Typography>
            </CardContent>
            </>}
            {showShoppingList && shopping_list_id != null && <>
            <Divider/>
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                    {shopping_list_id}
                </Typography>
            </CardContent>
            </>}
        </Card>
    )
}

export default OrderCard
