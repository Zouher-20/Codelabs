import { GenericTableModel } from '../(features)/admin/(admin-feature)/components/table/generic-tabel';

export interface TempletsTableType extends GenericTableModel {
    id?: string;
    labId?: string;
    image?: string;
    name?: string;
    createdAt?: Date;
}
