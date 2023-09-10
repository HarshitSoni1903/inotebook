const connectToMongo = require("./db.js");
const express = require("express");
const cors = require('cors');
connectToMongo();
const app = express();
const port = 5000;

//MiddleWare for parsing json
app.use(express.json())
//Available Routes
app.use("/api/auth/",cors(), require("./routes/auth"));
app.use("/api/notes/", cors() , require("./routes/notes"));


app.listen(port,()=>{
    console.log(`Backend connected at port ${port}`);
});
