import React from 'react'
import { Button } from '@mui/material';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
    const stripe= useStripe()
    const elements = useElements()

    const handlePaymnt = async() =>{
        let {error } = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:"http://localhost:3001/"
            }
        })

        if(error){
            console.log(error)
        }
    }
  return (
    <div style={{margin:"100px auto" , width:"60%"}}>
            <PaymentElement />
        <Button onClick={handlePaymnt} variant='contained' fullWidth> Pay </Button>
    </div>
  )
}
