export interface User {
    id: number,
    firstName: number,
    lastName: number,
    password: string,
    email: string,
    birthdate: Date,
    gender: string,
    role: {
        id: number,
        label: string
    },
}