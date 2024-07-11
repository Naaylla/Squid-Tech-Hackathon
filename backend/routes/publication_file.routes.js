const { get_all_publication_file, get_publication_file, add_publication_file, delete_publication_file, update_publication_file } = require('../controllers/publication_file.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_publication_file = require('express').Router()

router_publication_file.get('/', verify_Token, get_all_publication_file)
router_publication_file.get('/:id_publication', verify_Token, get_publication_file)
router_publication_file.post('/add', verify_Token, add_publication_file)
router_publication_file.delete('/delete/:id_file/:id_publication', verify_Token, delete_publication_file)
router_publication_file.put('/update/:id_file/:id_publication', verify_Token, update_publication_file)


module.exports = router_publication_file