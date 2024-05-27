import { Alert } from '@mui/material'
import React from 'react'

function AlertX({
    type,
    action,
    message,
    
}) {
    return (
        <Alert severity={type} action={action}>{message}</Alert>
    )
}
export default AlertX