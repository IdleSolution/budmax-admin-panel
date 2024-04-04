export const detailsConfig = [
    {
        apiPath: '/coal',
        name: 'coal',
        path: '/coal',
        listPath: '/coals',
        fields: [
            {
                shownName: 'nazwa',
                name: 'name',
            },
            {
                shownName: "typ",
                name: "type",
            },
            {
                shownName: "kopalnia",
                name: "mine",
            },
            {
                shownName: "kaloryczność",
                name: "calorificValue",
            },
            {
                shownName: "granulacja",
                name: "granulation",
            },
            {
                shownName: "cena",
                name: "price",
            },
        ]
    },
    {
        apiPath: '/pellet',
        name: 'pellet',
        listPath: '/pellets',
        path: '/pellet',
        fields: [
            {
                shownName: 'nazwa',
                name: 'name',
                defaultValue: '',
            },
            {
                shownName: "producent",
                name: "producent",
            },
            {
                shownName: "certyfikaty",
                name: "certificates",
            },
            {
                shownName: "cena",
                name: "price",
            },
        ]
    },
    {
        apiPath: '/stone',
        name: 'stone',
        listPath: '/stones',
        path: '/stone',
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
        apiPath: '/bus',
        name: 'bus',
        listPath: '/buses',
        path: '/bus',
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