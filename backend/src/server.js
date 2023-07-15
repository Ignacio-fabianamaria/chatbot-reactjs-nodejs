require('dotenv').config()
const app = require('./app')
const connection = require('./db/connection')

const port = process.env.PORT || 3000


app.listen(port, async() => {
    console.log(`API running on port ${port}`);
    const [result] = await connection.execute('SELECT 1')
    if(result){
       console.log('MYSQL connectiom ok!');
    }
})