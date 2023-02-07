import { dirname } from 'path'
import { fileURLToPath } from 'url'

//Variable __dirname para usar con type = module porque no lo tiene implementado
export const __dirname = dirname(fileURLToPath(import.meta.url))