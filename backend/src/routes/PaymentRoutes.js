import express,{ Router } from 'express';
import { checkout,handleStripeWebhook } from '../controllers/PaymentController.js';
import { auth } from '../middelwares/auth.js'
import bodyParser from 'body-parser';

const router = Router()

router.route('/checkout').post(auth,checkout)
// router.route('/webhook').post(express.raw({type:'application/json'}),handleStripeWebhook)

export default router