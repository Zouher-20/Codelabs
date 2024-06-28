export interface planType {
    id: string;
    name: string;
    price: number;
    duration: string | null;
    subtitle: string;
    createdAt?: Date;
    FeaturePlan?: Array<{ id: number; planId: string; name: NAMEPLAN; value: number }>;
}
