const { add_commentaire_like, get_commentaire_like, get_all_commentaire_like, delete_commentaire_like, update_commentaire_like } = require('../controllers/commentaire_like.controller')

const router_commentaire_like = require('express').Router()

router_commentaire_like.get('/', get_all_commentaire_like)
router_commentaire_like.get('/:id_commentaire', get_commentaire_like)
router_commentaire_like.post('/add', add_commentaire_like)
router_commentaire_like.delete('/delete/:id_commentaire/:id_like', delete_commentaire_like)
router_commentaire_like.put('/update/:id_commentaire/:id_like', update_commentaire_like)


module.exports = router_commentaire_like