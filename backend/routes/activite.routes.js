const { add_activite, delete_activite, update_activite, get_activite, get_all_activite } = require('../controllers/activite.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_activite = require('express').Router()

router_activite.get('/', get_all_activite)
router_activite.get('/:id', get_activite)
router_activite.post('/add', verify_Token, add_activite)
router_activite.delete('/delete/:id', verify_Token, delete_activite)
router_activite.put('/update/:id', verify_Token, update_activite)


module.exports = router_activite