import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe =  price * 100;
    const publishableKey = 	
    'pk_test_51H0894Fx2NTGU7pboQeu9W2qkwwwDJXGwG2s21e3WYbFXmLH7Gut7zQ0JYM6q13KcuwzolGluZJvEibo2sJtxb1f00T5JT8ylD';

    const onToken = token =>{
        alert('Payment successful')
    }
    return (
        <StripeCheckout 
        label= 'Pay Now'
        name = 'crown clothing Ltd.'
        billingAddress
        shippingAddress
        description = {`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel = 'Pay Now'
        token = {onToken}
        stripeKey = {publishableKey}
        />
    )
};

export default StripeCheckoutButton;