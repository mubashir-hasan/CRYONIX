
// const database = require('mysql2');  Common Js Approach

import database from 'mysql2';


const db = database.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBNAME
});

db.connect((err)=>{ 
    if (err){
        console.log('Connection Deleted ' + err)
    }else{
        console.log('Connection is Running')
    }
});


// module.exports = db; Common JS Approach

export default db;