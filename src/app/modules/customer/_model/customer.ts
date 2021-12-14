export class Customer {
    address: string;
    id_customer: number;
    id_region: number;
    image: string;
    mail: string;
    name: string;
    rfc: string;
    surname: string;
    status: number;

    constructor () {
        this.address = "";
        this.id_customer = 0;
        this.id_region = 0;
        this.image = "";
        this.mail = "";
        this.name = "";
        this.rfc = "";
        this.surname = "";
        this.status = 1;
    }
}