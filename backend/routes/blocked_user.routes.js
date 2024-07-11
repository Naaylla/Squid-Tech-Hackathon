const { get_all_bloqued_user, get_bloqued_user, add_bloqued_user, delete_bloqued_user, update_bloqued_user } = require('../controllers/blocked_user.controller')
const { verify_Token, verifyAdminRole } = require('../middlewares/auth.middleware')

const router_bloqued_user = require('express').Router()

router_bloqued_user.get('/', verify_Token, get_all_bloqued_user)
router_bloqued_user.get('/:id_user_blocker/', verify_Token, get_bloqued_user)
router_bloqued_user.post('/add', verify_Token, add_bloqued_user)
router_bloqued_user.delete('/delete/:id_user_blocker/:id_user_blocked', verify_Token, delete_bloqued_user)
router_bloqued_user.put('/update/:id_user_blocker/:id_user_blocked', verify_Token, verifyAdminRole, update_bloqued_user)


module.exports = router_bloqued_user