const express = require('express');
const app = express();
const port = 8000;


app.listen(port, function(err){
    if(err){
        console.log("error surver is not running on port : ", port);
    }

    console.log("surver is runing on port : ", port);

})