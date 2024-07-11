export const dummyPosts = [
    {
        id: 'post1',
        author: {
            id: 'user1',
            name: 'Jeanne Martin',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        },
        content: 'La biodiversité dans nos forêts est essentielle pour maintenir l\'équilibre écologique. Voici une photo d\'une magnifique clairière que j\'ai découverte lors de ma dernière randonnée.',
        image: 'https://www.suisse-rando.ch/media/cache/cloudtec_block_media_small/63f785e5ade80.jpg',
        likes: 15,
        comments: [
            {
                id: 'comment1',
                author: {
                    id: 'user2',
                    name: 'Pierre Dubois',
                    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
                },
                content: 'Wow, cette clairière semble être un véritable havre de paix. Merci Jeanne de nous montrer de tels trésors naturels !',
                timestamp: '2024-07-11T12:30:00Z',
            },
            {
                id: 'comment2',
                author: {
                    id: 'user3',
                    name: 'Marie Lefevre',
                    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
                },
                content: 'Magnifique photo, Jeanne ! Les forêts sont nos alliées essentielles pour lutter contre le changement climatique.',
                timestamp: '2024-07-11T13:00:00Z',
            },
        ],
        timestamp: '2024-07-11T12:00:00Z',
    },
    {
        id: 'post2',
        author: {
            id: 'user2',
            name: 'Pierre Dubois',
            avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        content: 'Les abeilles jouent un rôle crucial dans la pollinisation des plantes. Voici une ruche que j\'ai observée dans un champ de lavande en Provence.',
        image: 'https://www.pnr-saintebaume.fr/wp-content/uploads/sites/4/2020/09/miel_denis_caviglia-1181x630.jpg',
        likes: 12,
        comments: [
            {
                id: 'comment3',
                author: {
                    id: 'user1',
                    name: 'Jeanne Martin',
                    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
                },
                content: 'Pierre, tu as capturé un moment si précieux ! Les abeilles sont des ouvrières incroyables de notre écosystème.',
                timestamp: '2024-07-11T14:00:00Z',
            },
            {
                id: 'comment4',
                author: {
                    id: 'user3',
                    name: 'Marie Lefevre',
                    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
                },
                content: 'Cette photo est magnifique ! Les abeilles sont tellement importantes pour la biodiversité.',
                timestamp: '2024-07-11T14:30:00Z',
            },
        ],
        timestamp: '2024-07-11T11:00:00Z',
    },
    {
        id: 'post3',
        author: {
            id: 'user3',
            name: 'Marie Lefevre',
            avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        },
        content: 'Les océans sont notre bien le plus précieux. Chaque geste compte pour les préserver. Voici une photo d\'un coucher de soleil sur l\'océan Atlantique.',
        image: 'https://i0.wp.com/www.photo-paysage.com/albums/userpics/10001/Reflets_du_soleil_couchant_sur_la_plage.jpg',
        likes: 8,
        comments: [
            {
                id: 'comment5',
                author: {
                    id: 'user1',
                    name: 'Jeanne Martin',
                    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
                },
                content: 'Marie, cette photo capture vraiment la beauté fragile de nos océans. Merci de nous rappeler à quel point ils sont précieux.',
                timestamp: '2024-07-11T15:00:00Z',
            },
            {
                id: 'comment6',
                author: {
                    id: 'user2',
                    name: 'Pierre Dubois',
                    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
                },
                content: 'Magnifique coucher de soleil ! Les océans nous offrent tant de merveilles à protéger.',
                timestamp: '2024-07-11T15:30:00Z',
            },
        ],
        timestamp: '2024-07-10T15:00:00Z',
    },
];
