const { get_all_publication_like, get_publication_like, add_publication_like, delete_publication_like, update_publication_like } = require('../controllers/publication_like.controller')

const router_publication_like = require('express').Router()

router_publication_like.get('/', get_all_publication_like)
router_publication_like.get('/:id', get_publication_like)
router_publication_like.post('/add', add_publication_like)
router_publication_like.delete('/delete/:id', delete_publication_like)
router_publication_like.put('/update/:id', update_publication_like)


module.exports = router_publication_like