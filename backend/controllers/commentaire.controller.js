const connexion = require("../utils/db");

const connexion = require("../utils/db");

const add_commentaire = async (req, res) => {
    const { text_commentaire, id_user, id_publication } = req.body;
    const sql = 'INSERT INTO COMMENTAIRE (text_commentaire, id_user, id_publication) VALUES (?, ?, ?)';
    const values = [text_commentaire, id_user, id_publication];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout du commentaire" });
        }
        res.status(200).json({ data: result, message: "Commentaire ajouté avec succès" });
    });
};

const delete_commentaire = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM COMMENTAIRE WHERE id_commentaire = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression du commentaire" });
        }
        res.status(200).json({ data: result, message: "Commentaire supprimé avec succès" });
    });
};



const update_commentaire = async (req, res) => {
    const { id } = req.params;
    const { text_commentaire, id_user, id_publication } = req.body;
    const sql = 'UPDATE COMMENTAIRE SET text_commentaire = ?, id_user = ?, id_publication = ? WHERE id_commentaire = ?';
    const values = [text_commentaire, id_user, id_publication, id];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification du commentaire" });
        }
        res.status(200).json({ data: result, message: "Commentaire modifié avec succès" });
    });
};


const get_all_commentaire = async (req, res) => {
    const sql = 'SELECT * FROM COMMENTAIRE';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la récupération des commentaires" });
        }
        res.status(200).json({ data: rows, message: "Commentaires récupérés avec succès" });
    });
};


const get_commentaire = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM COMMENTAIRE WHERE id_commentaire = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la récupération du commentaire" });
        }
        res.status(200).json({ data: rows, message: "Commentaire récupéré avec succès" });
    });
};


module.exports = {
    add_commentaire,
    delete_commentaire,
    update_commentaire,
    get_all_commentaire,
    get_commentaire
};
