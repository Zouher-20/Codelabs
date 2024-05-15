export interface AddBlogInput {
    content: string;
    title: string;
    photo?: string;
}

export interface GetBlogByCreatedAtInput {
    page: number;
    pageSize: number;
    blogTitle?: string;
    blogContent?: string;
}

export interface GetTrendingBlogInput {
    page: number;
    pageSize: number;
    blogTitle?: string;
    blogContent?: string;
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
    blogContent?: string;
}
