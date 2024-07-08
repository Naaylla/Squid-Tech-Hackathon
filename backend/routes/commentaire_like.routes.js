const { add_commentaire_like, get_commentaire_like, get_all_commentaire_like, delete_commentaire_like, update_commentaire_like } = require('../controllers/commentaire_like.controller')

const router_commentaire_routes = require('express').Router()

router_commentaire_routes.get('/', get_all_commentaire_like)
router_commentaire_routes.get('/:id', get_commentaire_like)
router_commentaire_routes.post('/add', add_commentaire_like)
router_commentaire_routes.delete('/delete/:id', delete_commentaire_like)
router_commentaire_routes.put('/update/:id', update_commentaire_like)


module.exports = router_commentaire_routes