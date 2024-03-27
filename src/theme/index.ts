export { default as DefaultTheme } from './default'

export type ThemeTypes = ['light']

export type PosibleThemesTypes = ThemeTypes[number]

export const perfilThemes = [
  'linear-gradient(90deg, #99CED5 0%, #FFD4BF 100%)',
  'linear-gradient(90deg, #AA7E7E 0%, #F2AC89 100%, #A589F2 100%)',
  'linear-gradient(90deg, #99B5D5 0%, #C4BFFF 100%)',
  'linear-gradient(90deg, #B3D599 0%, #C0FFBF 100%)',
  'linear-gradient(90deg, #99A3D5 0%, #FFBFBF 100%)',
  'linear-gradient(90deg, #D59999 0%, #FFF9BF 100%)',
  'linear-gradient(90deg, #D599CF 0%, #E3FFBF 100%)',
  'linear-gradient(90deg, #A1D599 0%, #C0BFFF 100%)',
  'linear-gradient(90deg, #5476EF 0%, #EF9CA7 100%)',
  'linear-gradient(90deg, #B4F2FA 0%, #F2FFBF 100%)',
] as const

export type PerfilThemeTypes = (typeof perfilThemes)[number]
