
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//this port is for heroku as it requires a dynamic port
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error)=> {
        if(error){
            console.log('Unable to append to server log');
        }
    });
    next(); 
});

//this is to show maintenance page. since this doesn't 
// have NEXT(), the code will not execute after his function
// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/',(req, res) =>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to Express website',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About Page',
    });
  });

app.get('/project',(req, res) => {
    res.render('project.hbs', {
        pageTitle:'Project Page',
    });
})

app.get('/bad',(req, res)=> {
    res.send({
        errorMessage:'Unable to handle request'
    });
});


app.listen(port,() =>{
    console.log(`Server is up on port ${port}`)
}); 