export interface planType {
    id: string;
    name: string;
    price: number;
    duration: string | null;
    subtitle: string;
    title: string;
    createdAt?: Date;
    features: Array<{ name: NAMEPLAN; value: number }>;
}
