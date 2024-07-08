const { get_chat, get_all_chat, add_chat, delete_chat, update_chat } = require('../controllers/chat.controller')

const router_chat = require('express').Router()

router_chat.get('/', get_all_chat)
router_chat.get('/:id', get_chat)
router_chat.post('/add', add_chat)
router_chat.delete('/delete/:id', delete_chat)
router_chat.put('/update/:id', update_chat)


module.exports = router_chat