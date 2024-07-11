const { get_all_publication, get_publication, add_publication, delete_publication, update_publication, get_user_publications } = require('../controllers/publication.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_publication = require('express').Router()

router_publication.get('/', verify_Token, get_all_publication)
router_publication.get('/:id_publication', verify_Token, get_publication)
router_publication.post('/add', verify_Token, add_publication)
router_publication.delete('/delete/:id_publication', verify_Token, delete_publication)
router_publication.put('/update/:id_publication', verify_Token, update_publication)
router_publication.get('/user/:id_user', verify_Token, get_user_publications);

module.exports = router_publication