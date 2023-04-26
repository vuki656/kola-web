import { config } from 'dotenv'
import {
    cleanEnv,
    url,
} from 'envalid'

config()

const env = cleanEnv(process.env, {
    API_URL: url(),
})

export default env
