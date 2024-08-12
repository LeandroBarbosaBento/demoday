import { Value } from "sass"

// types
export enum ProjectType {
    IC = 'IC',
    TCC = 'TCC',
    DISC = 'DISC',
    MSC = 'MSC',
    PHD = 'PHD'
}

export interface User {
    id: string
    name: string
    email: string
    cpf: string
    university: string
    type: 'STUDENT' | 'ADMIN' | 'PROFESSOR'
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    password: string
}

export interface AccCriteriaDemoday{
    id: number
    name: string
    description: string
}

export interface EvalCriteriaDemoday{
    id: number
    name: string
    description: string
}

export interface Demoday{
    id: number
    name: string
    year: number
    phaseOneInit: string 
    phaseOneEnd: string 
    phaseTwoInit: string 
    phaseTwoEnd: string 
    phaseThreeInit: string 
    phaseThreeEnd: string 
    phaseFourInit: string 
    phaseFourEnd: string 
    accCriteriaDemoday: AccCriteriaDemoday
    evalCriteriaDemoday: EvalCriteriaDemoday
}

export interface Project{
    id: number
    period: number
    title: string
    linkvideo: string
    discipline:string
    professor: string
    year:	{value: number, leap: boolean}
    description: string
    category: string
    tecnologies: string
    linkdoc: string
    status: 'SUBMITTED' | 'REFUSED' | 'ACCEPTED'
    type: 'IC' | 'TCC' | 'DISC' | 'MSC' | 'PHD'
    emails: string[]
    image: string
    demoday: Demoday
    rejectionReason: string
    user: User
    projectType: string
    rating?: number
}

export interface Committee{
    demoday: Demoday
}

export interface CommitteeUser{
    committee: Committee
    user: User
}