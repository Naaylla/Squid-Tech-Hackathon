const { get_all_publication_file, get_publication_file, add_publication_file, delete_publication_file, update_publication_file } = require('../controllers/publication_file.controller')

const router_publication_file = require('express').Router()

router_publication_file.get('/', get_all_publication_file)
router_publication_file.get('/:id', get_publication_file)
router_publication_file.post('/add', add_publication_file)
router_publication_file.delete('/delete/:id_file/:id_publication', delete_publication_file)
router_publication_file.put('/update/:id_file/:id_publication', update_publication_file)


module.exports = router_