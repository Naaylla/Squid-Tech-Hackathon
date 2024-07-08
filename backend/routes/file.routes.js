const { get_all_file, get_file, add_file, delete_file, update_file } = require('../controllers/file.controller')

const router_file = require('express').Router()

router_file.get('/', get_all_file)
router_file.get('/:id', get_file)
router_file.post('/add', add_file)
router_file.delete('/delete/:id', delete_file)
router_file.put('/update/:id', update_file)


module.exports = router_file 