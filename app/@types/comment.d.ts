export interface commentType {
    blogId: string;
    comment: string;
    id: string;
    userId: string;
    userprojectId: string | null;
    createdAt: Date;
    user: {
        id: string;
        username: string;
        userImage: string | null | undefined;
        email: string;
    };
}
