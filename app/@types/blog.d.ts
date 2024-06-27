export interface blogType {
    viewCount: ReactNode;
    hasStarred: boolean;
    id: string;
    title: string;
    photo: string;
    contant: string;
    commentCount: number;
    starCount: number;
    createdAt: Date;
    userId: string;
    user: {
        id: string;
        username: string;
        userImage: string | null;
        email: string;
    };
}
