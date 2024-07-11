const { get_chat, get_all_chat, add_chat, delete_chat, update_chat, get_chat_data } = require('../controllers/chat.controller')

const router_chat = require('express').Router()

router_chat.get('/', get_all_chat)
router_chat.get('/:id_chat', get_chat)
router_chat.post('/add', add_chat)
router_chat.delete('/delete/:id', delete_chat)
router_chat.put('/update/:id', update_chat)
router_chat.get('/details/:id_chat', get_chat_data)

module.exports = router_chat