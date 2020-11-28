export interface Salon {
    
    id: string;
    ownerID: string;
    name: string;
    type: string;
    describe: string;
    hours: string;
    locations: Location[];
    services: Service[];
    rates: Rate[];

}   

interface Location {
    
    id: string;
    city: string;
    code: string;
    street: string;
    houseNumber: string;
    apartmentNumber: string;

}

interface Service {

    id: string;
    offerTitle: string;
    price: string;
    time: string;

}

export interface Rate {

    id: string;
    rate: number;

}