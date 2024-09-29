import {  getLoggedInUsername,databaseConnection, generateToken, executeQuery} from '@/app/api/utils'
import { headers } from "next/headers";

export  async function POST(request) {
    let connection = false

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const headerList = headers();
    const body = await request.text()
    const sig = headerList.get('stripe-signature')
    let event


    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
        console.log(event.type)
        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                const paymentMethodID = event.data.object.payment_method
                const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodID);
                const email = paymentMethod.billing_details.email
                console.log("payment intent", paymentIntent);
                // If the payment intent has an invoice, retrieve the invoice
                if (paymentIntent.invoice) {
                    const invoice = await stripe.invoices.retrieve(paymentIntent.invoice);

                    // Get the subscription ID from the invoice
                    const subscriptionID = invoice.subscription;

                    // Log this in the database
                    const connection = await databaseConnection();
                    let query = `INSERT INTO subscriptions (email, id) VALUES('${email}', '${subscriptionID}') `;
                    await executeQuery(connection, query);

                    console.log(`Subscription ID: ${subscriptionID}`);
                }else {
                    throw new Error("Invoice not found")
                }
            break;
        } 

        return new Response(JSON.stringify({ success: true }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        });

    } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`)
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 500
        });
    }finally{
        if(connection){
            connection.end()
        }
    }
}