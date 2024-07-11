const { get_all_event_user, get_event_user, add_event_user, delete_event_user, update_event_user } = require('../controllers/event_user.controller')
const { verify_Token, verifyAdminRole } = require('../middlewares/auth.middleware')

const router_event_user = require('express').Router()

router_event_user.get('/', verify_Token, get_all_event_user)
router_event_user.get('/:id_event', verify_Token, get_event_user)
router_event_user.post('/add', verify_Token, add_event_user)
router_event_user.delete('/delete/:id_event/:id_user', verify_Token, verifyAdminRole, delete_event_user)
router_event_user.put('/update/:id_event/:id_user', verify_Token, update_event_user)


module.exports = router_event_user