const { get_all_commentaire, get_commentaire, add_commentaire, delete_commentaire, update_commentaire } = require('../controllers/commentaire.controller')

const router_commmentaire = require('express').Router()

router_commmentaire.get('/', get_all_commentaire)
router_commmentaire.get('/:id', get_commentaire)
router_commmentaire.post('/add', add_commentaire)
router_commmentaire.delete('/delete/:id', delete_commentaire)
router_commmentaire.put('/update/:id', update_commentaire)


module.exports = router_commmentaire
