import { Router } from 'express';
import { checkout } from '../controllers/PaymentController.js';
import { auth } from '../middelwares/auth.js'

const router = Router()

router.route('/checkout').post(auth,checkout)

export default router