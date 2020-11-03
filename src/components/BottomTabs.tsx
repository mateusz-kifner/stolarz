import React, { SyntheticEvent } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import WorkIcon from '@material-ui/icons/Work'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'



function BottomTabs({history}:import('react-router-dom').RouteChildrenProps) {
    const [value, setValue] = React.useState<string>('Orders')
  
    const handleChange = (_:object, newValue:string) => {
      setValue(newValue)
      history.push("/"+newValue)
    };
  
    return (
        <BottomNavigation value={value} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Orders" value="Orders" icon={<WorkIcon />} />
            <BottomNavigationAction label="Shopping List" value="ShoppingList" icon={<ShoppingCartIcon />} />
            <BottomNavigationAction label="Finances" value="Finances" icon={<AttachMoneyIcon />} />
        </BottomNavigation>
    )
}

export default BottomTabs
