const { get_all_publication_like, get_publication_like, add_publication_like, delete_publication_like, update_publication_like } = require('../controllers/publication_like.controller')

const router_publication_like = require('express').Router()

router_publication_like.get('/', get_all_publication_like)
router_publication_like.get('/:id_publication', get_publication_like)
router_publication_like.post('/add', add_publication_like)
router_publication_like.delete('/delete/:id_publication/:id_like', delete_publication_like)
router_publication_like.put('/update/:id_publication/:id_like', update_publication_like)


module.exports = router_publication_like