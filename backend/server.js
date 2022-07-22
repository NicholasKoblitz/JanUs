const {PORT}=  require('./config.js')
const app = require("./app.js");


app.listen(PORT, function () {
    console.log(`Running on Port: ${PORT}` )
})