export const user = {
    username: "test",
    fullName: "Neil Anderson",
    permissions: [
        'actionItem',
        'actionInventory'
    ]
};

export const items = [
    {
        id: 3,
        quantity: 6,
        min: 9,
        name: "Mercury",
        category: "Mineral",

        notes:[
            {
                id: 1,
                date: "17.03.2022",
                text: "Lorem ipsum dolor sit amet."
            },
            {
                id: 2,
                date: "22.02.2022",
                text: "Serviced. Renewal in 6 months."
            }
        ],
        

        changes:[
            { 
                dateTime: "15.03.2022",
                quantity: 15,
                agent: "Neil A.",
                change: 5
            },
            { 
                dateTime: "13.03.2022",
                quantity: 10,
                agent: "Neil A.",
                change: -2
            },
            { 
                dateTime: "12.03.2022",
                quantity: 12,
                agent: "Carol",
                change: -1
            },
            {
                dateTime: "10.02.2022",
                quantity: 13,
                agent: "John",
                change: 8
            }
        ]
    },
    {
        id: 5,
        quantity: 3,
        min: 2,
        name: "Gold",
        category: "Mineral"
    },
    {
        id: 6,
        quantity: 10,
        min: 11,
        name: "Nitrogen",
        category: "Mineral"
    },
    {
        id: 9,
        quantity: 25,
        min: 15,
        name: "Sapphire",
        category: "Mineral"
    },
    {
        id: 10,
        quantity: 5,
        min: 5,
        name: "Liquid Aluminium",
        category: "Liquid"
    },
    {
        id: 15,
        quantity: 9,
        min: 20,
        name: "Ammonium",
        category: "Liquid"
    },
    {
        id: 16,
        quantity: 19,
        min: 15,
        name: "Nitrogen Gas",
        category: "Gas"
    },
    {
        id: 17,
        quantity: 100,
        min: 60,
        name: "CO2 Gas",
        category: "Gas"
    },
    {
        id: 19,
        quantity: 34,
        min: 60,
        name: "Octane",
        category: "Gas"
    },
    {
        id: 21,
        quantity: 10,
        min: 15,
        name: "Fine filter",
        category: "Filter"
    },
    {
        id: 22,
        quantity: 10,
        min: 15,
        name: "Porous filter",
        category: "Filter"
    }
];