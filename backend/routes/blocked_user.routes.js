const { get_all_bloqued_user, get_bloqued_user, add_bloqued_user, delete_bloqued_user, update_bloqued_user } = require('../controllers/blocked_user.controller')

const router_bloqued_user = require('express').Router()

router_bloqued_user.get('/', get_all_bloqued_user)
router_bloqued_user.get('/:id', get_bloqued_user)
router_bloqued_user.post('/add', add_bloqued_user)
router_bloqued_user.delete('/delete/:id', delete_bloqued_user)
router_bloqued_user.put('/update/:id', update_bloqued_user)


module.exports = router_bloqued_user