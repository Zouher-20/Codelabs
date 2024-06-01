export interface userType {
    name: string;
    id: string;
    email: string;
    image?: string | null;
    plan?: string;
    bio?: string;
    position?: string;
    labs?: number;
    classes?: number;
    role?: string;
}

export interface ClassRoomUserType {
    name: string;
    id: string;
    email: string;
    image?: string | null;
    isTeacher: boolean;
}
