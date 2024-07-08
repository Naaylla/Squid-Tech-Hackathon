const { get_all_user, get_user, add_user, delete_user, update_user } = require('../controllers/user.controller')

const router_user = require('express').Router()

router_user.get('/', get_all_user)
router_user.get('/:id', get_user)
router_user.post('/add', add_user)
router_user.delete('/delete/:id', delete_user)
router_user.put('/update/:id', update_user)


module.exports = router_user  