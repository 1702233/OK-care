import { Competentie } from './competentie.model';

export interface User {
    email?: string;
    firstname?: string;
    lastname?: string;
    postcode?: string;
    role?: string;
    stad?: string;
    status?: string;
    id?: string;
    huisnummer?: number;
    straat?: string;
    competentie?: Array<Competentie>;
}
