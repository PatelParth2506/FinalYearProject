import {  Router } from 'express';
import { getUserForSlidebar,
    getMessage,
    sendMessage,
    deleteMessage
 } from '../controllers/MessageController.js';
import { auth } from '../middelwares/auth.js'
import { upload } from '../middelwares/multer.js';

const router = Router();

router.route('/getuser').post(auth,getUserForSlidebar);
router.route('/getmessage/:recieverid').get(auth,getMessage);
router.route('/sendmessage/:recieverid').post(auth,upload.single('image'),sendMessage);
router.route('/deletemessage/:messageId').delete(auth,deleteMessage)

export default router;