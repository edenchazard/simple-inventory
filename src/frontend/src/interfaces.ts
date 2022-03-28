export interface LoggedInUser{
    id: number,
    email: string,
    last_name: string,
    first_name: string,
    permissions: { [key: string]: boolean },
    timezone: string
};

export interface Stock{
    category:{
        id: number,
        label: string
    },
    changes: [
        {
            stockID: number,
            date_time: string,
            quantity: number,
            adjust: number,
            agent:{
                id: number,
                first_name: string,
                last_name: string
            }
        }
    ],
    minimum: number,
    name: string,
    notes: [
        {
            noteID: number,
            agent:{
                id: number,
                first_name: string,
                last_name: string
            },
            date_time: string,
            description: string
        }
    ],
    quantity: number,
    stockID: number
};