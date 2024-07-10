const connexion = require("../utils/db");

// Ajouter un utilisateur à un chat
const add_chat_user = async (req, res) => {
    const { id_chat, id_user } = req.body;
    const sql = 'INSERT INTO CHAT_USER (id_chat, id_user) VALUES (?, ?)';
    const values = [id_chat, id_user];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un utilisateur d'un chat
const delete_chat_user = async (req, res) => {
    const { id_chat, id_user } = req.params;
    const sql = 'DELETE FROM CHAT_USER WHERE id_chat = ? AND id_user = ?';

    connexion.query(sql, [id_chat, id_user], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression" });
        }
        if (result.affectedRows === 0) {
            return res.status(200).json({ message: "La personne ou la discussion n'existe pas" });
        }

        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un utilisateur dans un chat
const update_chat_user = async (req, res) => {
    const { id_chat, id_user } = req.body;
    const sql = 'UPDATE CHAT_USER SET id_user = ? WHERE id_chat = ?';
    const values = [id_user, id_chat];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les utilisateurs de chats
const get_all_chat_user = async (req, res) => {
    const sql = 'SELECT * FROM CHAT_USER';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un utilisateurs de chat par son ID
const get_chat_user = async (req, res) => {
    const { id_chat } = req.params;
    const sql = `
        SELECT cu.id_chat, u.id_user, u.username_user
        FROM CHAT_USER cu
        JOIN USER u ON cu.id_user = u.id_user
        WHERE cu.id_chat = ?
    `;

    connexion.query(sql, [id_chat], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }

        // Si aucun résultat n'est trouvé pour cet id_chat
        if (rows.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé pour cet id_chat" });
        }

        // Mapper les résultats pour obtenir la structure demandée
        const formattedResponse = {
            id_chat: rows[0].id_chat,
            users: rows.map(row => ({
                id: row.id_user,
                username: row.username_user
            }))
        };

        res.status(200).json({ data: formattedResponse, message: "Sélectionné avec succès" });
    });
};

module.exports = {
    add_chat_user,
    delete_chat_user,
    update_chat_user,
    get_all_chat_user,
    get_chat_user
};