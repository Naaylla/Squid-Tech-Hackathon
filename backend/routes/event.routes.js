const { get_all_event, get_event, add_event, delete_event, update_event } = require('../controllers/event.controller')

const router_event = require('express').Router()

router_event.get('/', get_all_event)
router_event.get('/:id_event', get_event)
router_event.post('/add', add_event)
router_event.delete('/delete/:id_event', delete_event)
router_event.put('/update/:id_event', update_event)


module.exports = router_event