export interface User {
    id?: number,
    first_name?: string,
    last_name?: string,
    username?: string,
    password: string,
    email?: string,
    birthdate?: Date,
    gender?: string,
    role?: {
        id: number,
        label: string
    },
    role_id?: number,
}