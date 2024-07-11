const { get_chat, get_all_chat, add_chat, delete_chat, update_chat, get_chat_data } = require('../controllers/chat.controller')
const { verify_Token, verifyAdminRole } = require('../middlewares/auth.middleware')

const router_chat = require('express').Router()

router_chat.get('/', verify_Token, get_all_chat)
router_chat.get('/:id_chat', verify_Token, get_chat)
router_chat.post('/add', verify_Token, add_chat)
router_chat.delete('/delete/:id', verify_Token, delete_chat)
router_chat.put('/update/:id', verify_Token, verifyAdminRole, update_chat)
router_chat.get('/details/:id_chat', verify_Token, verifyAdminRole, get_chat_data)

module.exports = router_chat