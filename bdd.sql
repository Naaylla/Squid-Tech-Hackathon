-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 12 juil. 2024 à 01:10
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `recyclage`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateChatNameGroupe` (IN `chat_id` INT)   BEGIN
    DECLARE user1_name VARCHAR(255);
    DECLARE user2_name VARCHAR(255);
    DECLARE nombre_user_total INT;
    DECLARE nombre_user_restant INT;

    SELECT u.nom INTO user1_name
    FROM CHAT_USER cu
    JOIN USER u ON cu.id_user = u.id_user
    WHERE cu.id_chat = chat_id
    ORDER BY cu.id_user
    LIMIT 1;

    SELECT u.nom INTO user2_name
    FROM CHAT_USER cu
    JOIN USER u ON cu.id_user = u.id_user
    WHERE cu.id_chat = chat_id
    ORDER BY cu.id_user
    LIMIT 1 OFFSET 1;

    SELECT COUNT(*) INTO nombre_user_total
    FROM CHAT_USER
    WHERE id_chat = chat_id;

    SET nombre_user_restant = nombre_user_total - 2;

    UPDATE CHAT
    SET nom = CONCAT(user1_name, '-', user2_name, ' + ', nombre_user_restant)
    WHERE id_chat = chat_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateChatNamePriver` (IN `chat_id` INT)   BEGIN
    DECLARE user1_name VARCHAR(255);
    DECLARE user2_name VARCHAR(255);

    SELECT u.nom INTO user1_name
    FROM CHAT_USER cu
    JOIN USER u ON cu.id_user = u.id_user
    WHERE cu.id_chat = chat_id
    ORDER BY cu.id_user
    LIMIT 1;

    SELECT u.nom INTO user2_name
    FROM CHAT_USER cu
    JOIN USER u ON cu.id_user = u.id_user
    WHERE cu.id_chat = chat_id
    ORDER BY cu.id_user
    LIMIT 1 OFFSET 1;

    UPDATE CHAT
    SET nom = CONCAT(user1_name, '-', user2_name)
    WHERE id_chat = chat_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `activite`
--

CREATE TABLE `activite` (
  `id_activite` int(11) NOT NULL,
  `date_debut_activite` date NOT NULL,
  `heure_debut_activite` time NOT NULL,
  `description_activite` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `activite`
--

INSERT INTO `activite` (`id_activite`, `date_debut_activite`, `heure_debut_activite`, `description_activite`) VALUES
(9, '2024-07-11', '10:30:00', 'Activité mise à jour'),
(10, '2024-07-10', '09:00:00', 'Nouvelle activité'),
(11, '2024-07-10', '09:00:00', 'Nouvelle activité');

--
-- Déclencheurs `activite`
--
DELIMITER $$
CREATE TRIGGER `check_date_activite_before_insert` BEFORE INSERT ON `activite` FOR EACH ROW BEGIN
    DECLARE today DATE;
    DECLARE activite_date DATE;

    SET today = CURDATE();
    SET activite_date = NEW.date_debut_activite;

    IF activite_date <= today THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La date de l''activité doit être supérieure à la date d''aujourd''hui.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_date_activite_before_update` BEFORE UPDATE ON `activite` FOR EACH ROW BEGIN
    DECLARE today DATE;
    DECLARE activite_date DATE;

    SET today = CURDATE();
    SET activite_date = NEW.date_debut_activite;

    IF activite_date <= today THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La date de l''activité doit être supérieure à la date d''aujourd''hui.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `blocked_user`
--

CREATE TABLE `blocked_user` (
  `id_user_blocker` int(11) NOT NULL,
  `id_user_blocked` int(11) NOT NULL,
  `date_blocked` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `chat`
--

CREATE TABLE `chat` (
  `id_chat` int(11) NOT NULL,
  `date_time_debut_chat` datetime DEFAULT current_timestamp(),
  `type_chat` varchar(6) DEFAULT 'prive',
  `nom_chat` varchar(255) DEFAULT NULL,
  `id_user_chat_creator` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chat`
--

INSERT INTO `chat` (`id_chat`, `date_time_debut_chat`, `type_chat`, `nom_chat`, `id_user_chat_creator`) VALUES
(24, '2024-07-11 22:38:41', 'priver', 'test', 1);

--
-- Déclencheurs `chat`
--
DELIMITER $$
CREATE TRIGGER `prevent_invalid_type_chat_before_insert` BEFORE INSERT ON `chat` FOR EACH ROW BEGIN
    -- Vérifie si la valeur de type_chat est valide
    IF NEW.type_chat NOT IN ('priver', 'groupe') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid value for type_chat. It must be either "priver" or "groupe".';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_chat_name_before_insert` BEFORE INSERT ON `chat` FOR EACH ROW BEGIN
    DECLARE chat_user_count INT;
    
    -- Initialiser le nombre d'utilisateurs dans le nouveau chat à 0
    SET chat_user_count = 0;

    -- Mettre à jour le type_chat en fonction du nombre d'utilisateurs restants
    IF chat_user_count = 0 THEN
        SET NEW.nom_chat = 'moi';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `chat_user`
--

CREATE TABLE `chat_user` (
  `id_chat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chat_user`
--

INSERT INTO `chat_user` (`id_chat`, `id_user`) VALUES
(24, 56);

--
-- Déclencheurs `chat_user`
--
DELIMITER $$
CREATE TRIGGER `before_chat_user_insert` BEFORE INSERT ON `chat_user` FOR EACH ROW BEGIN
    DECLARE chat_creator INT;
    -- Récupérer l'id_user_creator de la table chat
    SELECT id_user_chat_creator INTO chat_creator
    FROM chat
    WHERE id_chat = NEW.id_chat;

    -- Vérifier si id_user est égal à id_user_creator
    IF NEW.id_user = chat_creator THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: The user cannot be the creator of the chat.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_chat_user_update` BEFORE UPDATE ON `chat_user` FOR EACH ROW BEGIN
    DECLARE chat_creator INT;
    -- Récupérer l'id_user_creator de la table chat
    SELECT id_user_chat_creator INTO chat_creator
    FROM chat
    WHERE id_chat = NEW.id_chat;

    -- Vérifier si id_user est égal à id_user_creator
    IF NEW.id_user = chat_creator THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: The user cannot be the creator of the chat.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_blocked_user_chat_before_update` BEFORE UPDATE ON `chat_user` FOR EACH ROW BEGIN
    DECLARE is_blocked_sender INT;
    DECLARE is_blocked_receiver INT;
    
    -- Vérifier si l'utilisateur est bloqué par l'expéditeur
    SELECT COUNT(*) INTO is_blocked_sender FROM FRIEND WHERE id_friend_sender = NEW.id_user AND id_friend_receiver = NEW.id_chat;
    
    -- Vérifier si l'utilisateur est bloqué par le destinataire
    SELECT COUNT(*) INTO is_blocked_receiver FROM FRIEND WHERE id_friend_sender = NEW.id_chat AND id_friend_receiver = NEW.id_user;
    
    IF is_blocked_sender > 0 OR is_blocked_receiver > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'L''utilisateur est bloqué.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_group_chat_size` BEFORE INSERT ON `chat_user` FOR EACH ROW BEGIN
    DECLARE participant_count INT;
    DECLARE chat_type VARCHAR(6);
    
    -- Récupérer le type de la discussion à partir de la table CHAT
    SELECT type_chat INTO chat_type FROM CHAT WHERE id_chat = NEW.id_chat;
    
    -- Compter le nombre de participants actuels dans la discussion
    SELECT COUNT(*) INTO participant_count FROM CHAT_USER WHERE id_chat = NEW.id_chat;
    
    -- Vérifier si le type de la discussion est 'groupe' et s'il y a déjà 15 participants
    IF chat_type = 'groupe' AND participant_count >= 15 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Un chat de groupe ne peut pas avoir plus de 15 participants.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_chat_on_last_user_removal` AFTER DELETE ON `chat_user` FOR EACH ROW BEGIN
    DECLARE user_count INT;
    DECLARE chat_id INT;
    
    -- Récupérer l'ID du chat affecté par la suppression de l'utilisateur
    SET chat_id = OLD.id_chat;
    
    -- Compter le nombre d'utilisateurs restants dans le chat
    SELECT COUNT(*) INTO user_count
    FROM CHAT_USER
    WHERE id_chat = chat_id;
    
    -- Si le nombre d'utilisateurs devient zéro, supprimer le chat de la table CHAT
    IF user_count = 0 THEN
        DELETE FROM CHAT WHERE id_chat = chat_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `prevent_multiple_private_chats_before_insert` BEFORE INSERT ON `chat_user` FOR EACH ROW BEGIN
    DECLARE existing_private_chats INT;

    -- Vérifier s'il existe déjà un chat privé entre les mêmes utilisateurs
    SELECT COUNT(*)
    INTO existing_private_chats
    FROM chat_user cu1
    JOIN chat_user cu2 ON cu1.id_chat = cu2.id_chat
    JOIN chat c ON cu1.id_chat = c.id_chat
    WHERE cu1.id_user = NEW.id_user
      AND cu2.id_user = NEW.id_user
      AND cu1.id_user <> cu2.id_user
      AND c.type_chat = 'priver';

    -- Si un chat privé existe déjà, signaler une erreur
    IF existing_private_chats > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Vous ne pouvez pas créer plusieurs chats privés avec le même utilisateur.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `prevent_multiple_private_chats_before_update` BEFORE UPDATE ON `chat_user` FOR EACH ROW BEGIN
    DECLARE existing_private_chats INT;

    -- Vérifier s'il existe déjà un chat privé entre les mêmes utilisateurs
    SELECT COUNT(*)
    INTO existing_private_chats
    FROM chat_user cu1
    JOIN chat_user cu2 ON cu1.id_chat = cu2.id_chat
    JOIN chat c ON cu1.id_chat = c.id_chat
    WHERE cu1.id_user = NEW.id_user
      AND cu2.id_user = NEW.id_user
      AND cu1.id_user <> cu2.id_user
      AND c.type_chat = 'priver';

    -- Si un chat privé existe déjà, signaler une erreur
    IF existing_private_chats > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Vous ne pouvez pas créer plusieurs chats privés avec le même utilisateur.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `prevent_user_addition_to_chat_before_insert` BEFORE INSERT ON `chat_user` FOR EACH ROW BEGIN
    DECLARE is_blocked INT;
    
    -- Vérifier si l'utilisateur est bloqué par l'un des participants existants dans le chat
    SELECT COUNT(*) INTO is_blocked
    FROM FRIEND f
    JOIN CHAT_USER cu ON f.id_friend_sender = cu.id_user OR f.id_friend_receiver = cu.id_user
    WHERE (f.id_friend_sender = NEW.id_user OR f.id_friend_receiver = NEW.id_user)
      AND cu.id_chat = NEW.id_chat;
    
    -- Si l'utilisateur est bloqué, signaler une erreur
    IF is_blocked > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'L''utilisateur est bloqué par un participant existant dans ce chat.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_chat_name_after_insert` AFTER INSERT ON `chat_user` FOR EACH ROW BEGIN
    DECLARE chat_user_count INT;
    DECLARE chat_name VARCHAR(255); -- Ajustez la longueur selon vos besoins
    
    -- Compter le nombre total d'utilisateurs dans le chat
    SELECT COUNT(*) INTO chat_user_count FROM CHAT_USER WHERE id_chat = NEW.id_chat;

    -- Mettre à jour le nom du chat en fonction du nombre d'utilisateurs
    IF chat_user_count = 1 THEN
        -- Si c'est le premier utilisateur dans le chat, mettre à jour avec son nom
        SELECT username_user INTO chat_name FROM USER WHERE id_user = NEW.id_user;
        UPDATE CHAT SET nom_chat = chat_name WHERE id_chat = NEW.id_chat;
    ELSE
        -- Si plus d'un utilisateur dans le chat, mettre à jour avec le premier utilisateur + nombre restant
        SELECT CONCAT(username_user, ' + ', (chat_user_count - 1), ' autres') INTO chat_name
        FROM USER 
        WHERE id_user = (SELECT id_user FROM CHAT_USER WHERE id_chat = NEW.id_chat LIMIT 1);
        
        UPDATE CHAT SET nom_chat = chat_name WHERE id_chat = NEW.id_chat;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_chat_name_after_update` AFTER UPDATE ON `chat_user` FOR EACH ROW BEGIN
    DECLARE chat_user_count INT;
    DECLARE chat_name VARCHAR(255); -- Ajustez la longueur selon vos besoins
    
    -- Compter le nombre total d'utilisateurs dans le chat
    SELECT COUNT(*) INTO chat_user_count FROM CHAT_USER WHERE id_chat = NEW.id_chat;

    -- Mettre à jour le nom du chat en fonction du nombre d'utilisateurs
    IF chat_user_count = 1 THEN
        -- Si c'est le premier utilisateur dans le chat, mettre à jour avec son nom
        SELECT username_user INTO chat_name FROM USER WHERE id_user = NEW.id_user;
        UPDATE CHAT SET nom_chat = chat_name WHERE id_chat = NEW.id_chat;
    ELSE
        -- Si plus d'un utilisateur dans le chat, mettre à jour avec le premier utilisateur + nombre restant
        SELECT CONCAT(username_user, ' + ', (chat_user_count - 1), ' autres') INTO chat_name
        FROM USER  
        WHERE id_user = (SELECT id_user FROM CHAT_USER WHERE id_chat = NEW.id_chat LIMIT 1);
        
        UPDATE CHAT SET nom_chat = chat_name WHERE id_chat = NEW.id_chat;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_chat_type_before_insert` AFTER INSERT ON `chat_user` FOR EACH ROW BEGIN
    DECLARE chat_user_count INT;
    
    -- Compter le nombre de participants dans le chat
    SELECT COUNT(*) INTO chat_user_count FROM chat_user WHERE id_chat = NEW.id_chat;
    
    -- Mettre à jour le type_chat en fonction du nombre de participants
    IF chat_user_count > 2 THEN
        UPDATE CHAT SET type_chat = 'groupe' WHERE id_chat = NEW.id_chat;
    ELSE
        UPDATE CHAT SET type_chat = 'priver' WHERE id_chat = NEW.id_chat;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_chat_type_before_update` AFTER UPDATE ON `chat_user` FOR EACH ROW BEGIN
    DECLARE chat_user_count INT;
    
    -- Compter le nombre de participants dans le chat
    SELECT COUNT(*) INTO chat_user_count FROM chat_user WHERE id_chat = NEW.id_chat;
    
    -- Mettre à jour le type_chat en fonction du nombre de participants
    IF chat_user_count > 2 THEN
        UPDATE CHAT SET type_chat = 'groupe' WHERE id_chat = NEW.id_chat;
    ELSE
        UPDATE CHAT SET type_chat = 'priver' WHERE id_chat = NEW.id_chat;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `id_commentaire` int(11) NOT NULL,
  `text_commentaire` varchar(255) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_publication` int(11) NOT NULL,
  `date_time_commentaire` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commentaire_like`
--

CREATE TABLE `commentaire_like` (
  `id_commentaire` int(11) NOT NULL,
  `id_like` int(11) NOT NULL,
  `date_time_like_publication` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `id_event` int(11) NOT NULL,
  `id_user_creator` int(11) DEFAULT NULL,
  `date_time_debut_event` datetime NOT NULL,
  `date_time_fin_event` datetime NOT NULL,
  `title_event` varchar(255) NOT NULL,
  `status_event` varchar(12) DEFAULT 'indisponible',
  `max_user` int(11) DEFAULT 0,
  `description_event` varchar(255) NOT NULL,
  `adresse_event` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id_event`, `id_user_creator`, `date_time_debut_event`, `date_time_fin_event`, `title_event`, `status_event`, `max_user`, `description_event`, `adresse_event`) VALUES
(20, 1, '2024-07-10 10:00:00', '2024-07-10 12:00:00', 'Nouvel Événement', 'DATE EXPIRÉE', 100, 'desceiption de l\'event', '158 rue des freres ');

--
-- Déclencheurs `event`
--
DELIMITER $$
CREATE TRIGGER `after_event_insert` AFTER INSERT ON `event` FOR EACH ROW BEGIN
    INSERT INTO `EVENT_USER` (`id_event`, `id_user`)
    VALUES (NEW.`id_event`, NEW.`id_user_creator`);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_event_update` AFTER UPDATE ON `event` FOR EACH ROW BEGIN
    -- Vérifier si l'utilisateur créateur a changé
    IF NEW.`id_user_creator` <> OLD.`id_user_creator` THEN
        -- Supprimer l'ancien utilisateur créateur de l'événement
        DELETE FROM `EVENT_USER`
        WHERE `id_event` = NEW.`id_event` AND `id_user` = OLD.`id_user_creator`;
        
        -- Ajouter le nouvel utilisateur créateur de l'événement
        INSERT INTO `EVENT_USER` (`id_event`, `id_user`)
        VALUES (NEW.`id_event`, NEW.`id_user_creator`)
        ON DUPLICATE KEY UPDATE `id_user` = NEW.`id_user_creator`;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_event_dates` BEFORE INSERT ON `event` FOR EACH ROW BEGIN
    IF NEW.date_time_fin_event <= NEW.date_time_debut_event THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La date de fin de l''événement doit être après la date de début';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_event_status_before_update` BEFORE UPDATE ON `event` FOR EACH ROW BEGIN
    DECLARE current_user_count INT;

    IF NEW.date_time_fin_event < NOW() THEN
        SET NEW.status_event = "DATE EXPIRÉE"; -- Si la date de fin est passée, définir le statut comme "DATE EXPIRÉE"
    ELSE
        SET current_user_count = (
            SELECT COUNT(*) 
            FROM EVENT_USER 
            WHERE id_event = NEW.id_event
        );

        IF NEW.max_user > 0 THEN -- Si une limite d'utilisateurs est définie
            IF current_user_count >= NEW.max_user THEN
                SET NEW.status_event = 'complet'; -- Définir comme complet si le nombre d'utilisateurs atteint la limite
            ELSE
                SET NEW.status_event = 'disponible'; -- Sinon, définir comme disponible
            END IF;
        ELSE
            SET NEW.status_event = 'disponible'; -- Si aucune limite d'utilisateurs n'est définie, définir comme disponible
        END IF;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_event_status` BEFORE INSERT ON `event` FOR EACH ROW BEGIN
    DECLARE current_user_count INT;

    IF NEW.date_time_fin_event < NOW() THEN
        SET NEW.status_event = "DATE EXPIRÉE"; -- Si la date de fin est passée, définir le statut comme "DATE EXPIRÉE"
    ELSE
        SET current_user_count = (
            SELECT COUNT(*) 
            FROM EVENT_USER 
            WHERE id_event = NEW.id_event
        );

        IF NEW.max_user > 0 THEN -- Si une limite d'utilisateurs est définie
            IF current_user_count >= NEW.max_user THEN
                SET NEW.status_event = 'complet'; -- Définir comme complet si le nombre d'utilisateurs atteint la limite
            ELSE
                SET NEW.status_event = 'disponible'; -- Sinon, définir comme disponible
            END IF;
        ELSE
            SET NEW.status_event = 'disponible'; -- Si aucune limite d'utilisateurs n'est définie, définir comme disponible
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `event_activite`
--

CREATE TABLE `event_activite` (
  `id_event` int(11) NOT NULL,
  `id_activite` int(11) NOT NULL,
  `time_activite` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `event_user`
--

CREATE TABLE `event_user` (
  `id_event` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `event_user`
--

INSERT INTO `event_user` (`id_event`, `id_user`) VALUES
(20, 1);

--
-- Déclencheurs `event_user`
--
DELIMITER $$
CREATE TRIGGER `prevent_adding_user_to_full_event` BEFORE INSERT ON `event_user` FOR EACH ROW BEGIN
    DECLARE current_users_count INT;
    DECLARE max_users_count INT;
    
    SELECT COUNT(*) INTO current_users_count FROM EVENT_USER WHERE id_event = NEW.id_event;
    SELECT max_user INTO max_users_count FROM EVENT WHERE id_event = NEW.id_event;
    
    IF current_users_count >= max_users_count THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'L''événement est plein, impossible d''ajouter plus d''utilisateurs.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `file`
--

CREATE TABLE `file` (
  `id_file` int(11) NOT NULL,
  `description_file` varchar(255) DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `filepath` varchar(255) DEFAULT NULL,
  `filepath_local` varchar(255) DEFAULT NULL,
  `size_file` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `file`
--

INSERT INTO `file` (`id_file`, `description_file`, `filename`, `filepath`, `filepath_local`, `size_file`) VALUES
(1, 'Image de la publication de John.', 'john_publication.jpg', '/path/to/files', '/local/path/1', 0),
(2, 'Photo de vacances de Jane.', 'jane_vacation.png', '/path/to/files', '/local/path/2', 0),
(5, 'Description du fichier', 'example.jpg', '/path/to/file', '/local/path/to/file', 0),
(6, 'Image de la publication de Alice.', 'alice_publication.jpg', '/path/to/files', '/local/path/3', 0),
(7, 'Photo de vacances de Bob.', 'bob_vacation.png', '/path/to/files', '/local/path/4', 0),
(8, 'Photo de John', 'john_photo.jpg', '/path/to/files', '/local/path/5', 0),
(9, 'Image de paysage', 'landscape_image.png', '/path/to/files', '/local/path/6', 0);

--
-- Déclencheurs `file`
--
DELIMITER $$
CREATE TRIGGER `check_file_type` BEFORE INSERT ON `file` FOR EACH ROW BEGIN
    IF LOWER(SUBSTRING_INDEX(SUBSTRING_INDEX(NEW.filename, '.', -1), ' ', 1)) NOT IN ('jpg', 'jpeg', 'png', 'gif', 'pdf') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le type de fichier n''est pas autorisé.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `file_message`
--

CREATE TABLE `file_message` (
  `id_file` int(11) NOT NULL,
  `id_message` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `friend`
--

CREATE TABLE `friend` (
  `id_friend_sender` int(11) NOT NULL,
  `id_friend_receiver` int(11) NOT NULL,
  `date_time_friend_requested` datetime DEFAULT current_timestamp(),
  `date_time_friend_accepted` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `friend`
--

INSERT INTO `friend` (`id_friend_sender`, `id_friend_receiver`, `date_time_friend_requested`, `date_time_friend_accepted`) VALUES
(1, 53, '2024-07-11 15:53:47', '2024-07-11 17:02:29');

--
-- Déclencheurs `friend`
--
DELIMITER $$
CREATE TRIGGER `prevent_duplicate_friends` BEFORE INSERT ON `friend` FOR EACH ROW BEGIN
  DECLARE friend_exists INT;

  SELECT COUNT(*)
  INTO friend_exists
  FROM FRIEND
  WHERE (id_friend_sender = NEW.id_friend_receiver AND id_friend_receiver = NEW.id_friend_sender);

  IF friend_exists > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Friend request already exists in the opposite direction';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `prevent_update_after_acceptance` BEFORE UPDATE ON `friend` FOR EACH ROW BEGIN
    IF OLD.date_time_friend_accepted IS NOT NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot update the friend request after it has been accepted.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `impact`
--

CREATE TABLE `impact` (
  `id_impact` int(11) NOT NULL,
  `id_activite` int(11) NOT NULL,
  `date_impact` date NOT NULL,
  `consommation_energie` decimal(10,2) DEFAULT NULL,
  `emissions_ges` decimal(10,2) DEFAULT NULL,
  `utilisation_eau` decimal(10,2) DEFAULT NULL,
  `gestion_dechets` decimal(10,2) DEFAULT NULL,
  `autres_indicateurs` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `like`
--

CREATE TABLE `like` (
  `id_like` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `like`
--

INSERT INTO `like` (`id_like`, `id_user`) VALUES
(8, 1),
(10, 1),
(9, 53);

--
-- Déclencheurs `like`
--
DELIMITER $$
CREATE TRIGGER `check_like_count` BEFORE INSERT ON `like` FOR EACH ROW BEGIN
    IF NEW.id_user < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le nombre de like ne peut pas être inférieur à 0.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `id_chat` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `date_time_sended_message` datetime DEFAULT current_timestamp(),
  `message_content` varchar(255) NOT NULL,
  `date_time_updated_message` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id_message`, `id_chat`, `id_user`, `date_time_sended_message`, `message_content`, `date_time_updated_message`) VALUES
(14, 22, 2, '2024-07-10 21:40:00', 'salut mon frere', '2024-07-10 22:03:06');

--
-- Déclencheurs `message`
--
DELIMITER $$
CREATE TRIGGER `check_user_blockage_before_insert` BEFORE INSERT ON `message` FOR EACH ROW BEGIN
    DECLARE is_blocked_sender INT;
    DECLARE is_blocked_receiver INT;
    
    -- Vérifier si l'utilisateur est bloqué par l'expéditeur
    SELECT COUNT(*) INTO is_blocked_sender
    FROM FRIEND
    WHERE id_friend_sender = NEW.id_user
      AND id_friend_receiver = NEW.id_chat;
    
    -- Vérifier si l'utilisateur est bloqué par le destinataire
    SELECT COUNT(*) INTO is_blocked_receiver
    FROM FRIEND
    WHERE id_friend_sender = NEW.id_chat
      AND id_friend_receiver = NEW.id_user;
    
    -- Si l'utilisateur est bloqué par l'expéditeur ou le destinataire, signaler une erreur
    IF is_blocked_sender > 0 OR is_blocked_receiver > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'L''utilisateur est bloqué.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_user_blockage_before_update` BEFORE UPDATE ON `message` FOR EACH ROW BEGIN
    DECLARE is_blocked_sender INT;
    DECLARE is_blocked_receiver INT;
    
    -- Vérifier si l'utilisateur est bloqué par l'expéditeur
    SELECT COUNT(*) INTO is_blocked_sender
    FROM FRIEND
    WHERE id_friend_sender = NEW.id_user
      AND id_friend_receiver = NEW.id_chat;
    
    -- Vérifier si l'utilisateur est bloqué par le destinataire
    SELECT COUNT(*) INTO is_blocked_receiver
    FROM FRIEND
    WHERE id_friend_sender = NEW.id_chat
      AND id_friend_receiver = NEW.id_user;
    
    -- Si l'utilisateur est bloqué par l'expéditeur ou le destinataire, signaler une erreur
    IF is_blocked_sender > 0 OR is_blocked_receiver > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'L''utilisateur est bloqué.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `publication`
--

CREATE TABLE `publication` (
  `id_publication` int(11) NOT NULL,
  `textarea_publication` varchar(255) DEFAULT '',
  `date_time_publication` datetime DEFAULT current_timestamp(),
  `id_user` int(11) DEFAULT NULL,
  `type_publication` varchar(5) NOT NULL DEFAULT 'publi'
) ;

--
-- Déchargement des données de la table `publication`
--

INSERT INTO `publication` (`id_publication`, `textarea_publication`, `date_time_publication`, `id_user`, `type_publication`) VALUES
(10, 'Contenu de ma publication', '2024-07-11 04:22:46', 1, 'publi');

--
-- Déclencheurs `publication`
--
DELIMITER $$
CREATE TRIGGER `prevent_duplicate_publication` BEFORE INSERT ON `publication` FOR EACH ROW BEGIN
    DECLARE publication_count INT;
    SELECT COUNT(*) INTO publication_count FROM PUBLICATION 
    WHERE id_user = NEW.id_user 
    AND textarea_publication = NEW.textarea_publication 
    AND date_time_publication >= DATE_SUB(NOW(), INTERVAL 1 HOUR);
    
    IF publication_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La même publication ne peut pas être publiée deux fois en moins d''une heure.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `publication_file`
--

CREATE TABLE `publication_file` (
  `id_file` int(11) NOT NULL,
  `id_publication` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `publication_like`
--

CREATE TABLE `publication_like` (
  `id_publication` int(11) NOT NULL,
  `id_like` int(11) NOT NULL,
  `date_time_like_publication` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `share_user_publi`
--

CREATE TABLE `share_user_publi` (
  `id_user` int(11) NOT NULL,
  `id_publication` int(11) NOT NULL,
  `date_time_partage_publi` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `share_user_publi`
--

INSERT INTO `share_user_publi` (`id_user`, `id_publication`, `date_time_partage_publi`) VALUES
(1, 10, '2024-07-11 04:40:29');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `firstname_user` varchar(50) NOT NULL,
  `lastname_user` varchar(50) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `username_user` varchar(50) NOT NULL,
  `password_user` varchar(255) NOT NULL,
  `date_time_inscription_user` datetime DEFAULT current_timestamp(),
  `pays_user` varchar(50) NOT NULL,
  `commune_user` varchar(50) DEFAULT NULL,
  `telephone_user` varchar(20) DEFAULT NULL,
  `status_user` int(1) NOT NULL DEFAULT 0,
  `role_user` varchar(5) DEFAULT 'user',
  `score_user` decimal(5,2) DEFAULT 0.00,
  `gender_user` varchar(5) NOT NULL,
  `date_naissance_user` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `firstname_user`, `lastname_user`, `email_user`, `username_user`, `password_user`, `date_time_inscription_user`, `pays_user`, `commune_user`, `telephone_user`, `status_user`, `role_user`, `score_user`, `gender_user`, `date_naissance_user`) VALUES
(1, 'John Updated', 'Doe Updated', 'john.updated2@example.com', 'johndoe_updated2', '$2b$10$Ws1X7TmvyNUnpm6bIro5I.P9eZUPrGOOkdc42Zy0.vY17LUu9S1KK', '2024-07-10 10:00:00', 'France', 'Paris', '9876543214', 1, 'user', 100.00, 'femme', '1990-01-01'),
(53, 'John Updated', 'Doe Updated', 'john.updated@example.com', 'johndoe_updated', '$2b$10$FkdJmvSXEOy2CUOeeHANTuxQJEqwn8NdLhwQxlQ1PrWSVbezLvLHa', '2024-07-11 04:12:40', 'France', 'Paris', '9876543210', 0, 'user', 0.00, 'homme', '1990-01-01'),
(56, 'test', 'test', 'test@example.com', 'test', '$2b$10$iftEBSpXX.pFInzRLE.Y1e9gVl4gCQ9Wh5oZZVS59se3Xjirq5Zg6', '2024-07-11 18:40:40', 'France', 'Paris', '9876543211', 0, 'user', 0.00, 'homme', '1990-01-01');

--
-- Déclencheurs `user`
--
DELIMITER $$
CREATE TRIGGER `check_age_user_before_insert` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
    DECLARE dob DATE;
    DECLARE min_date DATE;
    DECLARE max_date DATE;

    SET dob = NEW.date_naissance_user;
    SET min_date = DATE_SUB(NOW(), INTERVAL 99 YEAR);
    SET max_date = DATE_SUB(NOW(), INTERVAL 10 YEAR);

    IF dob < min_date OR dob > max_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La date de naissance doit permettre à l''utilisateur d''avoir entre 10 et 99 ans.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_age_user_before_update` BEFORE UPDATE ON `user` FOR EACH ROW BEGIN
    DECLARE dob DATE;
    DECLARE min_date DATE;
    DECLARE max_date DATE;

    SET dob = NEW.date_naissance_user;
    SET min_date = DATE_SUB(NOW(), INTERVAL 99 YEAR);
    SET max_date = DATE_SUB(NOW(), INTERVAL 10 YEAR);

    IF dob < min_date OR dob > max_date THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La date de naissance doit permettre à l''utilisateur d''avoir entre 10 et 99 ans.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_gender_user_before_insert` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
    IF NOT (NEW.gender_user IN ('homme', 'femme', 'autre')) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La valeur de gender_user doit être soit "homme", "femme" ou "autre".';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_gender_user_before_update` BEFORE UPDATE ON `user` FOR EACH ROW BEGIN
    IF NOT (NEW.gender_user IN ('homme', 'femme', 'autre')) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La valeur de gender_user doit être soit "homme", "femme" ou "autre".';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_status_user_before_insert` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
    IF NEW.status_user NOT IN (0, 1) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'status_user doit être 0 ou 1';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_status_user_before_update` BEFORE UPDATE ON `user` FOR EACH ROW BEGIN
    IF NEW.status_user NOT IN (0, 1) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'status_user doit être 0 ou 1';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_user_email_before_insert` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
    DECLARE email_pattern VARCHAR(255);
    SET email_pattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$';
    IF NOT (NEW.email_user REGEXP email_pattern) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'L''email de l''utilisateur n''est pas valide.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_user_email_before_update` BEFORE UPDATE ON `user` FOR EACH ROW BEGIN
    DECLARE email_pattern VARCHAR(255);
    SET email_pattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$';
    IF NOT (NEW.email_user REGEXP email_pattern) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'L''email de l''utilisateur n''est pas valide.';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_user_score_before_insert` BEFORE INSERT ON `user` FOR EACH ROW BEGIN
    IF NEW.score_user < 0 OR NEW.score_user > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le score de l''utilisateur doit être entre 0';
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_user_score_before_update` BEFORE UPDATE ON `user` FOR EACH ROW BEGIN
    IF NEW.score_user < 0 OR NEW.score_user > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le score de l''utilisateur doit être entre 0 et 100.';
    END IF;
END
$$
DELIMITER ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activite`
--
ALTER TABLE `activite`
  ADD PRIMARY KEY (`id_activite`);

--
-- Index pour la table `blocked_user`
--
ALTER TABLE `blocked_user`
  ADD PRIMARY KEY (`id_user_blocker`,`id_user_blocked`),
  ADD KEY `FK_BLOCKED_USER` (`id_user_blocked`);

--
-- Index pour la table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `fk_chat_user_creator` (`id_user_chat_creator`);

--
-- Index pour la table `chat_user`
--
ALTER TABLE `chat_user`
  ADD PRIMARY KEY (`id_chat`,`id_user`),
  ADD KEY `fk_chat_user` (`id_user`) USING BTREE;

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`id_commentaire`),
  ADD UNIQUE KEY `text_commentaire` (`text_commentaire`),
  ADD KEY `FK_USER_COMMENT` (`id_user`),
  ADD KEY `FK_PUBLI_COMMENT` (`id_publication`);

--
-- Index pour la table `commentaire_like`
--
ALTER TABLE `commentaire_like`
  ADD PRIMARY KEY (`id_commentaire`,`id_like`),
  ADD KEY `FK_LIKE_COMMENT` (`id_like`);

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id_event`),
  ADD UNIQUE KEY `unique_event` (`date_time_debut_event`,`date_time_fin_event`,`title_event`),
  ADD KEY `FK_USER_CREATOR` (`id_user_creator`);

--
-- Index pour la table `event_activite`
--
ALTER TABLE `event_activite`
  ADD PRIMARY KEY (`id_event`,`id_activite`),
  ADD KEY `FK_ACTIV_EVENT` (`id_activite`);

--
-- Index pour la table `event_user`
--
ALTER TABLE `event_user`
  ADD PRIMARY KEY (`id_event`,`id_user`),
  ADD KEY `FK_USER_EVENT` (`id_user`);

--
-- Index pour la table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id_file`);

--
-- Index pour la table `file_message`
--
ALTER TABLE `file_message`
  ADD PRIMARY KEY (`id_file`,`id_message`),
  ADD KEY `FK_MSG_FILE` (`id_message`);

--
-- Index pour la table `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id_friend_sender`,`id_friend_receiver`),
  ADD KEY `FK_USER_RECEIVER` (`id_friend_receiver`);

--
-- Index pour la table `impact`
--
ALTER TABLE `impact`
  ADD PRIMARY KEY (`id_impact`),
  ADD KEY `fk_activite_impact` (`id_activite`);

--
-- Index pour la table `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `FK_LIKE_USER` (`id_user`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `FK_CHAT_MESSAGE` (`id_chat`),
  ADD KEY `FK_USER_MESSAGE` (`id_user`);

--
-- Index pour la table `publication`
--
ALTER TABLE `publication`
  ADD PRIMARY KEY (`id_publication`),
  ADD KEY `FK_USER_PUBLI` (`id_user`);

--
-- Index pour la table `publication_file`
--
ALTER TABLE `publication_file`
  ADD PRIMARY KEY (`id_file`,`id_publication`),
  ADD KEY `FK_PUBLI_FILE` (`id_publication`);

--
-- Index pour la table `publication_like`
--
ALTER TABLE `publication_like`
  ADD PRIMARY KEY (`id_publication`,`id_like`),
  ADD KEY `FK_LIKE_PUBLI` (`id_like`);

--
-- Index pour la table `share_user_publi`
--
ALTER TABLE `share_user_publi`
  ADD PRIMARY KEY (`id_user`,`id_publication`),
  ADD KEY `FK_PUBLI_SHARE` (`id_publication`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `UC_email_user` (`email_user`),
  ADD UNIQUE KEY `UC_username_user` (`username_user`),
  ADD UNIQUE KEY `UC_telephone_user` (`telephone_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activite`
--
ALTER TABLE `activite`
  MODIFY `id_activite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `chat`
--
ALTER TABLE `chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `id_commentaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `file`
--
ALTER TABLE `file`
  MODIFY `id_file` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `impact`
--
ALTER TABLE `impact`
  MODIFY `id_impact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `like`
--
ALTER TABLE `like`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `publication`
--
ALTER TABLE `publication`
  MODIFY `id_publication` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `blocked_user`
--
ALTER TABLE `blocked_user`
  ADD CONSTRAINT `FK_BLOCKED_USER` FOREIGN KEY (`id_user_blocked`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_BLOCKER_USER` FOREIGN KEY (`id_user_blocker`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `fk_chat_user_creator` FOREIGN KEY (`id_user_chat_creator`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `chat_user`
--
ALTER TABLE `chat_user`
  ADD CONSTRAINT `FK_USER_CHAT` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_chat_user_` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `FK_PUBLI_COMMENT` FOREIGN KEY (`id_publication`) REFERENCES `publication` (`id_publication`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_USER_COMMENT` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `commentaire_like`
--
ALTER TABLE `commentaire_like`
  ADD CONSTRAINT `FK_COMMENT_LIKE` FOREIGN KEY (`id_commentaire`) REFERENCES `commentaire` (`id_commentaire`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_LIKE_COMMENT` FOREIGN KEY (`id_like`) REFERENCES `like` (`id_like`) ON DELETE CASCADE;

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `FK_USER_CREATOR` FOREIGN KEY (`id_user_creator`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `event_activite`
--
ALTER TABLE `event_activite`
  ADD CONSTRAINT `FK_ACTIV_EVENT` FOREIGN KEY (`id_activite`) REFERENCES `activite` (`id_activite`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_EVENT_ACTIV` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE CASCADE;

--
-- Contraintes pour la table `event_user`
--
ALTER TABLE `event_user`
  ADD CONSTRAINT `FK_EVENT_USER` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_USER_EVENT` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `file_message`
--
ALTER TABLE `file_message`
  ADD CONSTRAINT `FK_FILE_MSG` FOREIGN KEY (`id_file`) REFERENCES `file` (`id_file`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_MSG_FILE` FOREIGN KEY (`id_message`) REFERENCES `message` (`id_message`) ON DELETE CASCADE;

--
-- Contraintes pour la table `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `FK_USER_RECEIVER` FOREIGN KEY (`id_friend_receiver`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_USER_SENDER` FOREIGN KEY (`id_friend_sender`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `impact`
--
ALTER TABLE `impact`
  ADD CONSTRAINT `fk_activite_impact` FOREIGN KEY (`id_activite`) REFERENCES `activite` (`id_activite`) ON DELETE CASCADE;

--
-- Contraintes pour la table `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `FK_LIKE_USER` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `publication`
--
ALTER TABLE `publication`
  ADD CONSTRAINT `FK_USER_PUBLI` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Contraintes pour la table `publication_file`
--
ALTER TABLE `publication_file`
  ADD CONSTRAINT `FK_FILE_PUBLI` FOREIGN KEY (`id_file`) REFERENCES `file` (`id_file`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_PUBLI_FILE` FOREIGN KEY (`id_publication`) REFERENCES `publication` (`id_publication`) ON DELETE CASCADE;

--
-- Contraintes pour la table `publication_like`
--
ALTER TABLE `publication_like`
  ADD CONSTRAINT `FK_LIKE_PUBLI` FOREIGN KEY (`id_like`) REFERENCES `like` (`id_like`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_PUBLI_LIKE` FOREIGN KEY (`id_publication`) REFERENCES `publication` (`id_publication`) ON DELETE CASCADE;

--
-- Contraintes pour la table `share_user_publi`
--
ALTER TABLE `share_user_publi`
  ADD CONSTRAINT `FK_PUBLI_SHARE` FOREIGN KEY (`id_publication`) REFERENCES `publication` (`id_publication`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_USER_SHARE` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
