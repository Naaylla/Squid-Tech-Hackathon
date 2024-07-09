const login = require('../controllers/auth.controller')

const router_auth = require('express').Router()

router_auth.post('/login', login)
router_auth.get('/:id')
router_auth.post('/add')
router_auth.delete('/delete/:id')
router_auth.put('/update/:id')


module.exports = router_auth  