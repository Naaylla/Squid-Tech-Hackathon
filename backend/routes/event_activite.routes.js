const { get_all_event_activite, get_event_activite, add_event_activite, delete_event_activite, update_event_activite } = require('../controllers/event_activite.controller')

const router_event_activite = require('express').Router()

router_event_activite.get('/', get_all_event_activite)
router_event_activite.get('/:id_event', get_event_activite)
router_event_activite.post('/add', add_event_activite)
router_event_activite.delete('/delete/:id_event/:id_activite', delete_event_activite)
router_event_activite.put('/update/:id_event/:id_activite', update_event_activite)


module.exports = router_event_activite