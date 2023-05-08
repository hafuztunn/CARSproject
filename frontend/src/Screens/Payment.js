import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import CheckoutForm from '../Components/CheckoutForm'

export default function Payment() {
    const [PublishAbleKey, setPublishAbleKey] = useState(null)
    const [clientSecret, setclienSecret] = useState("")

    useEffect(() => {
        fetch("http://localhost:3000/config" , {
           "method":"Get",
           headers:{
            "Content-type":"Application/Json"
           } 
        }).then((res)=>res.json()).then((data)=>setPublishAbleKey(loadStripe(data.PublishAbleKey)))
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/create-payment-intent" , {
            "method":"post",
            headers:{
             "Content-type":"Application/Json"
            } 
         }).then((res)=>res.json()).then((data)=>setclienSecret(data.clientSecret))
     
    }, [])
  return (
    <>  
       {PublishAbleKey && clientSecret ? 
        <Elements stripe={PublishAbleKey} options={{clientSecret}}>
            <CheckoutForm />
        </Elements> :<></>}
            
    </>
  )
}
