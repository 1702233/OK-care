import { Inschrijving } from './inschrijving.model';

export class Operatie {
    id: string;
    type: string;
    aantalmedewerkers: string;
    datum: string;
    begintijd: string;
    eindtijd: string;
    competenties: Array<Object>;
    inschrijving: Inschrijving;
}
