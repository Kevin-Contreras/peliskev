var express = require("express");
var bodyParser = require('body-parser')
var request = require("request");
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.get("/popu",function(req,res){
    var users="";
    request("https://api.themoviedb.org/3/movie/popular?api_key=bf1b3a179a48104bd1bbf23e4b68a18a&language=en-US&page=2",(err,response,body)=>{
        if (!err){
            users = JSON.parse(body);
            
         
        }
        res.render('index',{datos:users.results,titulo:"PELICULAS POPULARES"})
    })
    
})
router.get("/popu2",function(req,res){
    var users="";
    request("https://api.themoviedb.org/3/movie/popular?api_key=bf1b3a179a48104bd1bbf23e4b68a18a&language=en-US&page=1",(err,response,body)=>{
        if (!err){
            users = JSON.parse(body);
            
         
        }
        res.render('index2',{datos:users.results,titulo:"PELICULAS POPULARES"})
    })
    
})

router.get("/",urlencodedParser,(req,res)=>{
   
        res.render('nav')
   
    
})
router.post("/busqueda",urlencodedParser,function(req,res){
   
    var users="";
    console.log(req.body.find)
    request("https://api.themoviedb.org/3/search/movie?api_key=bf1b3a179a48104bd1bbf23e4b68a18a&query='"+req.body.find+"'",(err,response,body)=>{
        if (!err){
            users = JSON.parse(body);
            
         
        }
        res.render('busqueda',{datos:users.results,titulo:"PELICULAS ENCONTRADAS"})
       
    })
})
router.get("/:id",function(req,res){
    var users =""
    var userss =""
    var usersss =""
    var contador=0
    var objeto=[]
    var actores = ""
    request("https://api.themoviedb.org/3/movie/"+ req.params.id.toString( )+"?api_key=bf1b3a179a48104bd1bbf23e4b68a18a",(err,response,body)=>{
        if (!err){
           users= JSON.parse(body);
           request("https://api.themoviedb.org/3/movie/"+ req.params.id.toString( )+"/credits?api_key=bf1b3a179a48104bd1bbf23e4b68a18a",(err,response,body)=>{
    if (!err){
       userss= JSON.parse(body);
      

             
           
    }
    res.render("pelicula",{dato:users,actores:userss.cast})
         
  
})
        }
  
  })
  


})
router.get("/actor/:id",function(req,res){
    var actorPelicula="";
    var peliculasActor="";

    request("https://api.themoviedb.org/3/person/"+req.params.id.toString()+"?api_key=bf1b3a179a48104bd1bbf23e4b68a18a",(err,response,body)=>{
        if (!err){
            actorPelicula = JSON.parse(body);
            request("https://api.themoviedb.org/3/person/"+req.params.id.toString()+"/movie_credits?api_key=bf1b3a179a48104bd1bbf23e4b68a18a",(err,response,body)=>{
                if (!err){
                    peliculasActor = JSON.parse(body);
                }
                console.log(peliculasActor.cast)
                res.render("nuevo",{dato:actorPelicula,actores:peliculasActor.cast})
            })
           
        }
       
        
    })
})
module.exports=router;