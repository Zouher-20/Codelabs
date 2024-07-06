export interface RegisterUserInput {
    otp: string;
    email: string;
    name: string;
    password: string;
}

export interface AdminRegisterInput {
    email: string;
    name: string;
    password: string;
}

export interface DeleteMyAccountInput {
    password: string;
}

export interface AllUserInformationInput {
    blogPage: number;
    blogPageSize: number;
    challengePage: number;
    challengePageSize: number;
    userProjectPage: number;
    userProjectPageSize: number;
}

export interface GetUserDetails {
    userId: string;
}
export interface CompleteMyInfoInput {
    imagePath?: string;
    bio?: string;
    position?: string;
}
