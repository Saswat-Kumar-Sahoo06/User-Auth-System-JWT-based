import dotenv from 'dotenv/config'
import connect_DB from "./db/index.js";
import { app } from './app.js';

const PORT = process.env.PORT || 8000

connect_DB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on PORT:${PORT}`);
    })
})
.catch((err) => {
    console.log('Error happened in index.js file');
    
})