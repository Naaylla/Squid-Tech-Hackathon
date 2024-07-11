const { add_commentaire_like, get_commentaire_like, get_all_commentaire_like, delete_commentaire_like, update_commentaire_like } = require('../controllers/commentaire_like.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_commentaire_like = require('express').Router()

router_commentaire_like.get('/', verify_Token, get_all_commentaire_like)
router_commentaire_like.get('/:id_commentaire', verify_Token, get_commentaire_like)
router_commentaire_like.post('/add', verify_Token, add_commentaire_like)
router_commentaire_like.delete('/delete/:id_commentaire/:id_like', verify_Token, delete_commentaire_like)
router_commentaire_like.put('/update/:id_commentaire/:id_like', verify_Token, update_commentaire_like)


module.exports = router_commentaire_like