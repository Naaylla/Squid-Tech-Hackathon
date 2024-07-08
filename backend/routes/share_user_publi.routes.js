const { get_all_share_user_publi, get_share_user_publi, add_share_user_publi, delete_share_user_publi, update_share_user_publi } = require('../controllers/share_user_publi.controller')

const router_user_publi = require('express').Router()

router_user_publi.get('/', get_all_share_user_publi)
router_user_publi.get('/:id', get_share_user_publi)
router_user_publi.post('/add', add_share_user_publi)
router_user_publi.delete('/delete/:id', delete_share_user_publi)
router_user_publi.put('/update/:id', update_share_user_publi)


module.exports = router_user_publi