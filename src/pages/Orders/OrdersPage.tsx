import { Container, Fab, List, ListItem, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import OrderCard from '../../components/OrderCard'
import AddIcon from '@material-ui/icons/Add';
import { OrdersContext } from '../../context/OrdersContext';

const useStyles = makeStyles({
    ordersContainer:{
        height:"100%",
        position:"relative"
    },
    listContainer:{
        height:"100%",
        overflowY:"scroll"
    },
    flotingAdd:{
        position:"absolute",
        bottom:"5%",
        right:"5%"
    }
  });

function OrdersPage({history}:import("react-router-dom").RouteChildrenProps) {
    const {orders, addOrder, removeOrder, changeOrder} = useContext(OrdersContext);
    const classes = useStyles();
    const goToAddPage = ()=>{
        history.push("/Orders/Add")
    }

    
    return (
        <div className={classes.ordersContainer}>
            <List className={classes.listContainer}>
                {orders.map((value)=>{
                    return(
                        <ListItem key={"order" + value.id}>
                            <OrderCard {...value} />
                        </ListItem>
                    )
                })}
            </List>
            <Fab color="primary" aria-label="add" className={classes.flotingAdd} onClick={goToAddPage}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default OrdersPage
