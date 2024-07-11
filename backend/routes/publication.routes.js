const { get_all_publication, get_publication, add_publication, delete_publication, update_publication, get_user_publications} = require('../controllers/publication.controller')

const router_publication = require('express').Router()

router_publication.get('/', get_all_publication)
router_publication.get('/:id_publication', get_publication)
router_publication.post('/add', add_publication)
router_publication.delete('/delete/:id_publication', delete_publication)
router_publication.put('/update/:id_publication', update_publication)
router_publication.get('/user/:id_user', get_user_publications);

module.exports = router_publication