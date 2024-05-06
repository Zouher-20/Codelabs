import { userType } from './user';

export interface FeedbackType {
    id: string;
    feedback: string;
    user: userType;
}
