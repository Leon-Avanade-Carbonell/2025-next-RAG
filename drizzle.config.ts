import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

export default defineConfig({
    schema: './drizzle/db/schema.ts',
    out: './drizzle/migrations',
    dialect:'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL!
    },
    verbose: true,
    strict: true,
    // migrations: {
    //     schema: 'public', // used in PostgreSQL only, `drizzle` by default
    // },
})