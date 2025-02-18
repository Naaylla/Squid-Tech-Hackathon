const { get_all_publication_like, get_publication_like, add_publication_like, delete_publication_like, update_publication_like } = require('../controllers/publication_like.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_publication_like = require('express').Router()

router_publication_like.get('/', verify_Token, get_all_publication_like)
router_publication_like.get('/:id_publication', verify_Token, get_publication_like)
router_publication_like.post('/add', verify_Token, add_publication_like)
router_publication_like.delete('/delete/:id_publication/:id_like', verify_Token, delete_publication_like)

// ça ne sert a rien de modifier un like dans une publication pour cette version 
// je devrais pas modifier la table like en table react afin de pouvoir reagir aux publication et non pas liker seulement
// dans une prochaine version 

module.exports = router_publication_like