const { get_all_publication, get_publication, add_publication, delete_publication, update_publication } = require('../controllers/publication.controller')

const router_publication = require('express').Router()

router_publication.get('/', get_all_publication)
router_publication.get('/:id', get_publication)
router_publication.post('/add', add_publication)
router_publication.delete('/delete/:id', delete_publication)
router_publication.put('/update/:id', update_publication)


module.exports = router_publication