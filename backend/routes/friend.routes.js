const { get_all_friend, get_friend, add_friend, delete_friend, update_friend } = require('../controllers/friend.controller')

const router_friend = require('express').Router()

router_friend.get('/', get_all_friend)
router_friend.get('/:id', get_friend)
router_friend.post('/add', add_friend)
router_friend.delete('/delete/:id', delete_friend)
router_friend.put('/update/:id', update_friend)


module.exports = router_friend 