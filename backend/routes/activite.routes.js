const { add_activite, delete_activite, update_activite, get_activite, get_all_activite } = require('../controllers/activite.controller')

const router_activite = require('express').Router()

router_activite.get('/', get_all_activite)
router_activite.get('/:id', get_activite)
router_activite.post('/add', add_activite)
router_activite.delete('/delete/:id', delete_activite)
router_activite.put('/update/:id', update_activite)


module.exports = router_activite