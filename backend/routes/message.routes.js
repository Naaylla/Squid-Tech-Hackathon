const { get_all_message, get_message, add_message, delete_message, update_message } = require('../controllers/message.controller')

const router_message = require('express').Router()

router_message.get('/', get_all_message)
router_message.get('/:id_message', get_message)
router_message.post('/add', add_message)
router_message.delete('/delete/:id_message', delete_message)
router_message.put('/update/:id_message', update_message)


module.exports = router_message