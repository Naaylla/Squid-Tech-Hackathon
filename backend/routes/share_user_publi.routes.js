const { get_all_share_user_publi, get_share_user_publi, add_share_user_publi, delete_share_user_publi, get_shared_publi_by_user } = require('../controllers/share_user_publi.controller')
const { verify_Token } = require('../middlewares/auth.middleware')
const router_user_publi = require('express').Router()

router_user_publi.get('/', verify_Token, get_all_share_user_publi)
router_user_publi.get('/user/publication/:id_user', verify_Token, get_share_user_publi)
router_user_publi.get('/publication/user/:id_publication', verify_Token, get_shared_publi_by_user)
router_user_publi.post('/add', verify_Token, add_share_user_publi)
router_user_publi.delete('/delete/:id_user/:id_publication', verify_Token, delete_share_user_publi)


module.exports = router_user_publi