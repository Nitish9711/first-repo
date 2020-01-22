const express = require('express'); //this will pull express into our app
const app = express();  // this is will allow us to use it and create instance


const path = require('path');
const exphbs  = require('express-handlebars');


const PORT = process.env.PORT || 5000;  // this  will tell which port to use use either environt port or use 5000

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');





//set handlebar routes
app.get('/', function (req, res) {
    res.render('home',{
        stuff:"This is stuff..."
    });
});


// for routing
// set staic folder staic files are files which are never going to change
 
app.use(express.static(path.join(__dirname, 'public')));





app.listen(PORT, () => console.log('server is listening on port ' + PORT)); // to give the server;





