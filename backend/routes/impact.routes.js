const { get_all_impact, get_impact, add_impact, delete_impact, update_impact } = require('../controllers/impact.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_impact = require('express').Router()

router_impact.get('/', verify_Token, get_all_impact)
router_impact.get('/:id', verify_Token, get_impact)
router_impact.post('/add', verify_Token, add_impact)
router_impact.delete('/delete/:id', verify_Token, delete_impact)
router_impact.put('/update/:id', verify_Token, update_impact)


module.exports = router_impact