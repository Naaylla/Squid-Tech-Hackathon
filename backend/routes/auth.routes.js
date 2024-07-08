const router_ = require('express').Router()

router_.get('/')
router_.get('/:id')
router_.post('/add')
router_.delete('/delete/:id')
router_.put('/update/:id')


module.exports = router_