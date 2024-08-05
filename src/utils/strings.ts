// Expressão regular para validar apenas letras, espaços e acentos
export const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

// Expressão regular para validar links
export const linkPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;