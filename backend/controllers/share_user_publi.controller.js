const connexion = require("../utils/db");

// Ajouter un partage utilisateur-publication
const add_share_user_publi = async (req, res) => {
    const { id_user, id_publication } = req.body;
    const sql = 'INSERT INTO SHARE_USER_PUBLI (id_user, id_publication) VALUES (?, ?)';
    const values = [id_user, id_publication];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout du partage utilisateur-publication" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un partage utilisateur-publication par l'ID de l'utilisateur
const delete_share_user_publi = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM SHARE_USER_PUBLI WHERE id_user = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression du partage utilisateur-publication" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un partage utilisateur-publication
const update_share_user_publi = async (req, res) => {
    const { id_user, id_publication } = req.body;
    const sql = 'UPDATE SHARE_USER_PUBLI SET id_publication = ? WHERE id_user = ?';
    const values = [id_publication, id_user];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification du partage utilisateur-publication" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les partages utilisateur-publication
const get_all_share_user_publi = async (req, res) => {
    const sql = 'SELECT * FROM SHARE_USER_PUBLI';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection des partages utilisateur-publication" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un partage utilisateur-publication par l'ID de l'utilisateur
const get_share_user_publi = async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM SHARE_USER_PUBLI WHERE id_user = ?';

    connexion.query(sql, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection du partage utilisateur-publication" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_share_user_publi,
    delete_share_user_publi,
    update_share_user_publi,
    get_all_share_user_publi,
    get_share_user_publi
};
