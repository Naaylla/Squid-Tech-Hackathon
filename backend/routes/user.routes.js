const { get_all_user, get_user, add_user, delete_user, update_user } = require('../controllers/user.controller')
const { verify_Token, verifyAdminRole } = require('../middlewares/auth.middleware')

const router_user = require('express').Router()

router_user.get('/', verify_Token, verifyAdminRole, get_all_user)
router_user.get('/:id', verify_Token, verifyAdminRole, get_user)
router_user.post('/add', add_user)
router_user.delete('/delete/:id', verify_Token, delete_user)
router_user.put('/update/:id', verify_Token, update_user)


module.exports = router_user  