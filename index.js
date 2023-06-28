var express = require("express");
var app = express();
var router = require("./app/router/router");
var path =require("path")
app.use(router);
app.use(express.static( path.join(__dirname, '/app/views')))
app.set('views',  path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');
app.set("port",process.env.PORT||3000);
app.listen(app.get("port"),function(req,res){
    console.log("el servidor se inicializo en el puerto", app.get("port"))
})