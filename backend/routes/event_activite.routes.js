const { get_all_event_activite, get_event_activite, add_event_activite, delete_event_activite, update_event_activite } = require('../controllers/event_activite.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_event_activite = require('express').Router()

router_event_activite.get('/', verify_Token, get_all_event_activite)
router_event_activite.get('/:id_event', verify_Token, get_event_activite)
router_event_activite.post('/add', verify_Token, add_event_activite)
router_event_activite.delete('/delete/:id_event/:id_activite', verify_Token, delete_event_activite)
router_event_activite.put('/update/:id_event/:id_activite', verify_Token, update_event_activite)


module.exports = router_event_activite