const { get_all_file, get_file, add_file, delete_file, update_file } = require('../controllers/file.controller')
const router_file = require('express').Router()
const multer = require('multer');

router_file.get('/', get_all_file)
router_file.get('/:id_file', get_file)
router_file.post('/add', add_file)
router_file.delete('/delete/:id', delete_file)
router_file.put('/update/:id', update_file)



// Configurer le stockage avec Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Nom du fichier
    }
});

const upload = multer({ storage: storage });

// Exemple de route avec Multer
router_file.post('/upload', upload.array('files', 10), async (req, res) => {
    const { description_file } = req.body;
    const { filename, path: filePath, size } = req.file;

    // Insert file information into the database
    const sql = 'INSERT INTO file (description_file, filename, filepath, size_file) VALUES (?, ?, ?, ?)';
    const values = [description_file, filename, filePath, size];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            // Handle database insertion error
            return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du fichier dans la base de données.', error: err });
        }
        res.status(200).json({ message: 'Fichier enregistré avec succès.', file: { description_file, filename, filepath: filePath, size } });
    });
})




module.exports = router_file 