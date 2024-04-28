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
