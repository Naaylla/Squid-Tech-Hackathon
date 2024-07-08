const { get_all_chat_user, get_chat_user, add_chat_user, delete_chat_user, update_chat_user } = require('../controllers/chat_user.controller')

const router_chat_user = require('express').Router()

router_chat_user.get('/', get_all_chat_user)
router_chat_user.get('/:id', get_chat_user)
router_chat_user.post('/add', add_chat_user)
router_chat_user.delete('/delete/:id', delete_chat_user)
router_chat_user.put('/update/:id', update_chat_user)


module.exports = router_chat_user