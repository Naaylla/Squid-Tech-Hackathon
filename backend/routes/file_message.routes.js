const { get_all_file_message, get_file_message, add_file_message, delete_file_message, update_file_message } = require('../controllers/file_message')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_file_message = require('express').Router()

router_file_message.get('/', verify_Token, get_all_file_message)
router_file_message.get('/:id_file', verify_Token, get_file_message)
router_file_message.post('/add', verify_Token, add_file_message)
router_file_message.delete('/delete//:id_file/:id_message', verify_Token, delete_file_message)
router_file_message.put('/update//:id_file/:id_message', verify_Token, update_file_message)


module.exports = router_file_message