export interface planType {
    title: string;
    subtitle: string;
    duration: string;
    price: number;
    features: Array<{ name: NAMEPLAN; value: number }>;
}
