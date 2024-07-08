const { get_all_event_user, get_event_user, add_event_user, delete_event_user, update_event_user } = require('../controllers/event_user.controller')

const router_event_user = require('express').Router()

router_router_event_user.get('/', get_all_event_user)
router_router_event_user.get('/:id', get_event_user)
router_router_event_user.post('/add', add_event_user)
router_router_event_user.delete('/delete/:id', delete_event_user)
router_router_event_user.put('/update/:id', update_event_user)


module.exports = router_router_event_user