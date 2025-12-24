import express from 'express'
import { verifyToken } from '../middlewares/auth-middlewares.js';
import { getAllContacts,getMessagebyOtherUserId,sendMessage,getChatPartners } from '../controllers/message-controller.js';
import { arcjet_protection } from '../middlewares/arcjet-middleware.js';
const router = express.Router()

router.use(arcjet_protection,verifyToken)

router.get('/contacts',getAllContacts)
router.get('/chats',getChatPartners)
router.get('/:id',getMessagebyOtherUserId)
router.post('/send/:id',sendMessage)


export default router;