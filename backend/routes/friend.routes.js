const { get_all_friend, get_friend_accepted_request, get_friend_request, add_friend, delete_friend, update_friend } = require('../controllers/friend.controller')
const { verify_Token } = require('../middlewares/auth.middleware')

const router_friend = require('express').Router()

// pour afficher toutes les demandes envoyée
router_friend.get('/:id_friend_sender', verify_Token, get_all_friend)
// pour afficher toutes les demande d'amis accepter
router_friend.get('/accepted/:id_friend_sender', verify_Token, get_friend_accepted_request)
// pour afficher toutes les demande d'amis qui n'ont pas été accepter
router_friend.get('/pending/:id_friend_receiver', verify_Token, get_friend_request)
// envoyer une demande d'amis 
router_friend.post('/add', verify_Token, add_friend)
// supprimer une demande d'amis 
router_friend.delete('/delete/:id', verify_Token, delete_friend)
// pour accepter les demandes
router_friend.put('/update/:id_friend_sender/:id_friend_receiver', verify_Token, update_friend)


module.exports = router_friend 