const { get_all_like, get_like, add_like, delete_like, update_like } = require('../controllers/like.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_like = require('express').Router()

router_like.get('/', verify_Token, get_all_like)
router_like.get('/:id_like', verify_Token, get_like)
router_like.post('/add', verify_Token, add_like)
router_like.delete('/delete/:id_like', verify_Token, delete_like)
router_like.put('/update/:id_like', verify_Token, update_like)


module.exports = router_like