// types
interface User {
    id: string
    cpf: string
    email: string
    status: string
    type: 'STUDENT' | 'ADMIN' | 'PROFESSOR'
    university: string
}