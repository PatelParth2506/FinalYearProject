import Stripe from 'stripe';
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const checkout = asyncHandler(async(req,res)=>{
    const cartItems = req.body
    console.log(cartItems)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cartItems.map((item) => ({
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.description,
            //   images: [item.image], 
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });
    
      res.status(200).json(
        new ApiResponse(200,session,"Session Created SuccessFully")
      )
})


export { checkout }