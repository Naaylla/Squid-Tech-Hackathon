const connexion = require("../utils/db");

// Ajouter un chat
const add_chat = async (req, res) => {
    const { id_user_chat_creator, type_chat, nom_chat } = req.body;
    const sql = 'INSERT INTO CHAT (id_user_chat_creator, type_chat, nom_chat) VALUES (?, ?, ?)';
    const values = [id_user_chat_creator, type_chat || 'priver', nom_chat];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de l'ajout" });
        }
        res.status(200).json({ data: result, message: "Ajout avec succès" });
    });
};

// Supprimer un chat
const delete_chat = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM CHAT WHERE id_chat = ?';

    connexion.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la suppression" });
        }
        res.status(200).json({ data: result, message: "Supprimé avec succès" });
    });
};

// Mettre à jour un chat
const update_chat = async (req, res) => {
    const { id } = req.params;
    const { type_chat, nom_chat } = req.body;
    const sql = 'UPDATE CHAT SET type_chat = ?, nom_chat = ? WHERE id_chat = ?';
    const values = [type_chat, nom_chat, id];

    connexion.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la modification" });
        }
        res.status(200).json({ data: result, message: "Modifié avec succès" });
    });
};

// Obtenir tous les chats
const get_all_chat = async (req, res) => {
    const sql = 'SELECT * FROM CHAT';

    connexion.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        if (rows.length === 0) {
            return res.status(200).json({ data: rows, message: "Aucune discussion trouvée" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};

// Obtenir un chat par son ID
const get_chat = async (req, res) => {
    const { id_chat } = req.params;
    const sql = 'SELECT * FROM CHAT WHERE id_chat = ?';

    connexion.query(sql, [id_chat], (err, rows) => {
        if (err) {
            return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
        }
        if (rows.length === 0) {
            return res.status(400).json({ data: rows, message: "Aucune discussion trouvée" });
        }
        res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
    });
};




const get_chat_details = async (req, res) => {
    const { id_chat } = req.params

    try {

        const sql = 'SELECT * FROM CHAT WHERE id_chat = ?';
        const chat_response = connexion.query(sql, [id_chat], (err, rows) => {
            if (err) {
                return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
            }
            if (rows.length === 0) {
                return res.status(400).json({ data: rows, message: "Aucune discussion trouvée" });
            }
            res.status(200).json({ data: rows, message: "Sélectionné avec succès" });
        });

        if (chat_response.status === 200) {
            const id_chat = chat_response.data[0].id_chat
            const sql = "SELECT * FROM CHAT_USER WHERE id_chat = ?"
            const user_response = connexion.query(sql, [id_chat], (err, rows) => {
                if (err) {
                    return res.status(500).json({ data: err, message: "Erreur lors de la sélection" });
                }

            })
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des données du chat", error: err });
    }
}



const get_chat_data = async (req, res) => {
    const { id_chat } = req.params;

    try {
        // Récupérer les utilisateurs associés au chat
        const usersSQL = `
            SELECT u.*
            FROM USER u
            JOIN CHAT_USER cu ON u.id_user = cu.id_user
            WHERE cu.id_chat = ?
        `;
        const users = await queryPromise(usersSQL, [id_chat]);

        // Récupérer les messages du chat
        const messagesSQL = `
            SELECT *
            FROM MESSAGE
            WHERE id_chat = ?
        `;
        const messages = await queryPromise(messagesSQL, [id_chat]);

        // Renvoyer les données complètes du chat
        res.status(200).json({ users, messages });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des données du chat", error: err });
    }
};

// Fonction utilitaire pour exécuter des requêtes SQL avec des promesses
const queryPromise = (sql, values) => {
    return new Promise((resolve, reject) => {
        connexion.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


module.exports = {
    add_chat,
    delete_chat,
    update_chat,
    get_all_chat,
    get_chat,
    get_chat_data
};
