import Stripe from 'stripe';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Order } from '../models/OrderModel.js';
import { Cart } from '../models/CartModel.js';
import { Product } from '../models/ProductModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = asyncHandler(async (req, res) => {
  const cartItems = req.body;
  console.log(cartItems)
  const userId = req.user._id;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.productinfo.description,
          metadata: {
            productId: item.productinfo._id.toString(),
            sellerId: item.productinfo.seller.toString(),
          },
        },
        unit_amount: item.productinfo.price * 100,
      },
      quantity: item.quentity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cancel',
    metadata: {
      userId: userId.toString(),
    },
  });

  res.status(200).json(new ApiResponse(200, session, 'Session Created Successfully'));
});

const handleStripeWebhook = asyncHandler(async (req, res) => {
  console.log('Webhook received:', req.body);
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; 

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('Error in webhook', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;

    const line_items = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    const products = line_items.data.map((item) => ({
      productid: item.price.product.metadata.productId,
      quantity: item.quantity,
    }));

    const sellerId = line_items.data[0].price.product.metadata.sellerId;

    await Order.create({
      buyer: userId,
      products,
      totalprice: session.amount_total / 100,
      seller: sellerId,
    });

    await Cart.findOneAndDelete({buyer:userId})
    for (const item of products) {
      await Product.findByIdAndUpdate(
        item.productid,
        { $inc: { quentity: -item.quantity } }
      );
    }
    console.log('✅ Order created after successful payment');
  }

  res.status(200).send('Webhook received');
});

export { checkout, handleStripeWebhook };
