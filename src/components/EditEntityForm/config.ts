export const editConfig = [
    {
        apiUrl: '/coal',
        path: '/coal',
        name: 'coal',
        listUrl: '/coals',
        fields: [
            {
                shownName: 'nazwa',
                name: 'name',
                defaultValue: '',
            },
            {
                shownName: 'typ',
                name: 'type',
                defaultValue: 1,
                values: [
                    {
                        id: 1,
                        value: 'kostka'
                    },
                    {
                        id: 2,
                        value: 'orzech'
                    },
                    {
                        id: 3,
                        value: 'groszek'
                    },
                ],
            },
            {
                shownName: 'kopalnia',
                name: 'mine',
                defaultValue: '',
            },
            {
                shownName: 'kaloryczność',
                name: 'calorificValue',
                defaultValue: 0,
            },
            {
                shownName: 'granulacja',
                name: 'granulation',
                defaultValue: 0,
            },
            {
                shownName: 'cena',
                name: 'price',
                defaultValue: 0,
            },
        ]
    },
    {
        apiUrl: '/pellet',
        path: '/pellet',
        name: 'pellet',
        listUrl: '/pellets',
        fields: [
            {
                shownName: 'nazwa',
                name: 'name',
                defaultValue: '',
            },
            {
                shownName: 'producent',
                name: 'producent',
                defaultValue: '',
            },
            {
                shownName: 'certyfikaty',
                name: 'certificates',
                defaultValue: '',
            },
            {
                shownName: 'cena',
                name: 'price',
                defaultValue: 0,
            },
        ]
    },
    {
        apiUrl: '/stone',
        path: '/stone',
        name: 'stone',
        listUrl: '/stones',
        fields: [
            {
                shownName: 'nazwa',
                name: 'name',
                defaultValue: '',
            },
            {
                shownName: 'forma dostawy',
                name: 'deliveryForm',
                defaultValue: '',
            },
            {
                shownName: 'granulacja',
                name: 'granulation',
                defaultValue: 0,
            },
            {
                shownName: 'cena',
                name: 'price',
                defaultValue: 0,
            },
        ]
    },
    {
        apiUrl: '/bus',
        path: '/bus',
        name: 'bus',
        listUrl: '/buses',
        fields: [
            {
                shownName: 'model',
                name: 'model',
                defaultValue: '',
            },
            {
                shownName: 'pojemność silnika',
                name: 'engineCapacity',
                defaultValue: 0,
            },
            {
                shownName: 'cena za dzień',
                name: 'pricePerDay',
                defaultValue: 0,
            },
            {
                shownName: 'moc',
                name: 'power',
                defaultValue: 0,
            },
        ]
    },
]