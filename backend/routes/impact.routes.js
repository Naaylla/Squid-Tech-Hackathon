const { get_all_impact, get_impact, add_impact, delete_impact, update_impact } = require('../controllers/impact.controller')

const router_impact = require('express').Router()

router_impact.get('/', get_all_impact)
router_impact.get('/:id', get_impact)
router_impact.post('/add', add_impact)
router_impact.delete('/delete/:id', delete_impact)
router_impact.put('/update/:id', update_impact)


module.exports = router_impact