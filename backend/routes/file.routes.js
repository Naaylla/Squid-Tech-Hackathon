const { get_all_file, get_file, add_file, delete_file, update_file } = require('../controllers/file.controller')
const router_file = require('express').Router()
const multer = require('multer');
const connexion = require('../utils/db');
const { verify_Token } = require('../middlewares/auth.middleware');

router_file.get('/', get_all_file)
router_file.get('/:id_file', verify_Token, get_file)
router_file.post('/add', verify_Token, add_file)
router_file.delete('/delete/:id', verify_Token, delete_file)
router_file.put('/update/:id', verify_Token, update_file)



module.exports = router_file 