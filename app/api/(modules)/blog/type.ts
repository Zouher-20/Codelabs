export interface AddBlogInput {
    content: string;
    title: string;
    photo?: string;
}

export interface GetBlogByCreatedAtInput {
    page: number;
    pageSize: number;
    blogTitle?: string;
}

export interface GetTrendingBlogInput {
    page: number;
    pageSize: number;
    blogTitle?: string;
}
export interface DeleteMyBlogInput {
    blogId: string;
}

export interface EditBlogInput {
    content: string;
    title: string;
    blogId: string;
    photo?: string;
}

export interface GetAllBlogs {
    page: number;
    pageSize: number;
    blogTitle?: string;
}

export interface GetDetailsBlogInput {
    blogId: string;
}

export interface uploadImageInput {
    file: File;
}
export interface AddBlogCommentInput {
    blogId: string;
    comment: string
}

export interface GetCommentBlogInput {
    blogId: string;
    page: number;
    pageSize: number
}
export interface AddAndDeleteStarBlogInput {
    blogId: string;
    action: boolean;
}
export interface DeleteMyCommentInBlogInput {
    blogId: string;
    commentId: string;
}
export interface getMyBlogInput {
    page: number;
    pageSize: number;
    searchWord?: string;

}