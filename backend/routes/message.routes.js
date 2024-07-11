const { get_all_message, add_message, delete_message, update_message, get_message_user, get_message_chat } = require('../controllers/message.controller')
const { verify_Token, verifyAdminRole } = require('../middlewares/auth.middleware')

const router_message = require('express').Router()

router_message.get('/', verify_Token, verifyAdminRole, get_all_message)
router_message.get('/:id_user', verify_Token, get_message_user)
router_message.get('/:id_chat', verify_Token, get_message_chat)
router_message.post('/add', verify_Token, add_message)
router_message.delete('/delete/:id_message', verify_Token, delete_message)
router_message.put('/update/:id_message', verify_Token, update_message)


module.exports = router_message