import { namePattern, linkPattern} from "@/utils/strings"

export const rules = {
    required: (v: string) => !!v || 'Este campo é obrigatório!',
    onlyLettersAccentsAndSpaces: (v: string) => {
        return v.length === 0 
        || namePattern.test(v) 
        || 'Apenas letras, espaços e acentos são permitidos!'
    },
    email: (v: string) => {
        return v.length === 0 
        || /.+@.+\..+/.test(v) 
        || 'Email inválido'
    },
    link: (v: string) => !v || linkPattern.test(v) || 'Este link é inválido!',
    greaterThan: (max: number) => {
        return (v: number) => v >= max || `O valor deve ser maior ou igual a ${max}`
    },


}