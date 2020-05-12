import State from './State'

//Servidor y complementos
const PORT = process.env.PORT || 3000;
const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');

var app = express();

app.listen(PORT,function() {
    console.log('Server on port'+" "+PORT);
});

app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()


//Datos de comandos ingresados

var calcular = { 
    result: "0",
    str: "",
}

//Get / Recibir pagina

app.get('/',function(req,res){
    res.render('result',{comandos: calcular});
   
});

app.get('/:op1',function(req,res){
    res.render('result',{comandos: calcular});
   var op1 = req.body.cmd;
});


//Post / Mandar Datos Ingresados

app.post('/',urlencodedParser, total);

// Funcion

function total(req,res){
console.log(req.body);
    if(req.body.cmd == ""){
        res.render('result', {comandos: calcular});
    }
    
    else{

        //Almacenar Datos   // Enviar Datos // Calcular Datos 

        if(calcular["1"] == null){

            if(calcular["result"] == "Syntax Error"){
                calcular["result"] = "0";
                calcular["1"] = req.body.cmd;
                calcular["str"] = calcular["1"];
                res.render('result', {comandos: calcular});
                
            }
            else{
                calcular["1"] = req.body.cmd;
                calcular["str"] = calcular["1"];
                res.render('result', {comandos: calcular});
            }

        }

        //Ultimo problema, carga pero no calcula

        else if(calcular["2"] == null){

            if(calcular["result"] != "0"){
                calcular["1"]= State.Realizar(calcular["result"],calcular["1"],req.body.cmd);
                calcular["result"] = calcular["1"];

                // Borrar datos
                calcular["1"] = null;
                calcular["2"] = null;
                calcular["str"] = null;

                res.render('result', {comandos: calcular});
            }
            else {
                calcular["2"] = req.body.cmd;
                calcular["str"] = calcular["str"] + " " +  calcular["2"];
                res.render('result', {comandos: calcular});
            }
            
        }

        else{

                //Mandar a calculadora
                calcular["1"] = State.RealizarOp(calcular["1"],calcular["2"],req.body.cmd);

                calcular["result"] = calcular["1"];
                // Borrar datos
                calcular["1"] = null;
                calcular["2"] = null;
                calcular["str"] = null;

                res.render('result', {comandos: calcular});
            
        }
    }
    
    
}
