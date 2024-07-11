const { get_all_commentaire, get_commentaire, add_commentaire, delete_commentaire, update_commentaire } = require('../controllers/commentaire.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_commmentaire = require('express').Router()

router_commmentaire.get('/', get_all_commentaire)
router_commmentaire.get('/:id', get_commentaire)
router_commmentaire.post('/add', verify_Token, add_commentaire)
router_commmentaire.delete('/delete/:id', verify_Token, delete_commentaire)
router_commmentaire.put('/update/:id', verify_Token, update_commentaire)


module.exports = router_commmentaire
