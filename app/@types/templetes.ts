import { GenericTableModel } from '../(features)/admin/(admin-feature)/components/table/generic-tabel';

export interface TempletsTableType extends GenericTableModel {
    id: string;
    image: string;
    name: string;
    createdAt: Date;
}
