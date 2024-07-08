const { get_all_file_message, get_file_message, add_file_message, delete_file_message, update_file_message } = require('../controllers/file_message')

const router_file_message = require('express').Router()

router_file_message.get('/', get_all_file_message)
router_file_message.get('/:id', get_file_message)
router_file_message.post('/add', add_file_message)
router_file_message.delete('/delete/:id', delete_file_message)
router_file_message.put('/update/:id', update_file_message)


module.exports = router_file_message