// stock market app


const express = require('express'); //this will pull express into our app
const app = express();  // this is will allow us to use it and create instance


const path = require('path');
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;  // this  will tell which port to use use either environt port or use 5000

// use bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API keys pk_6f30550d2f3d4e339d2e2f16d0fcae38
// create call api function
function call_api(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_6f30550d2f3d4e339d2e2f16d0fcae38', {json: true }, (err, res, body) =>{
        if(err){
            return console.log(err);}
        console.log(body);
        if(res.statusCode === 200)
        {
            //console.log(body);
            finishedAPI(body)
        };
    
    });
};



// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');






//set handlebar index GET routes
app.get('/', function (req, res) {
    call_api(function (doneAPI){
        res.render('home',{
            stock: doneAPI
        });
    });
});

//set handlebar index POST routes

//call_api(function, req.body.stock_ticker)
 
app.post('/', function (req, res) {
    call_api(function (doneAPI){
        //posted_stuff = req.body.stock_ticker;
        res.render('home',{
            stock: doneAPI,
        
        });
    },req.body.stock_ticker);
});


// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});


// for routing
// set staic folder staic files are files which are never going to change
 
app.use(express.static(path.join(__dirname, 'public')));





app.listen(PORT, () => console.log('server is listening on port ' + PORT)); // to give the server;





