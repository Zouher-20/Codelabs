import { userType } from './user';

export interface FeedbackType {
    id: number;
    feedback: string;
    user: userType;
}
