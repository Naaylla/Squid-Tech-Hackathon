const { get_all_message, add_message, delete_message, update_message, get_message_user, get_message_chat } = require('../controllers/message.controller')

const router_message = require('express').Router()

router_message.get('/', get_all_message)
router_message.get('/:id_user', get_message_user)
router_message.get('/:id_chat', get_message_chat)
router_message.post('/add', add_message)
router_message.delete('/delete/:id_message', delete_message)
router_message.put('/update/:id_message', update_message)


module.exports = router_message