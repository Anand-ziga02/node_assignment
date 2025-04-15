const {Pool} =require('pg')
require('dotenv').config()

const pool=new Pool({
    connectionString:process.env.DATABASE_URL
})
pool.connect()
.then(()=>console.log(`Connected to Postgres 🚢 `))
.catch(()=>console.log(`Error while Database Connection 📥`))