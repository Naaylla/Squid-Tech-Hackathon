const { get_all_like, get_like, add_like, delete_like, update_like } = require('../controllers/like.controller')

const router_like = require('express').Router()

router_like.get('/', get_all_like)
router_like.get('/:id_like', get_like)
router_like.post('/add', add_like)
router_like.delete('/delete/:id_like', delete_like)
router_like.put('/update/:id_like', update_like)


module.exports = router_like