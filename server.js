const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// logging middleware
app.use((request, response, next)=>{
    let now = new Date().toString();
    let logLine = `${now}: ${request.method} ${request.url}`;
    console.log(logLine);
    fs.appendFile('server.log', logLine + '\n', (err)=>{
        console.log('Unable to append to server.log');
    });
    next();});

// maintenance middleware
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// })

//static middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
    })

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})
app.get('/', (request, response)=>{

    //response.send('<h1>Hello Express!</h1>');
    // response.send({
    //     name: 'Andrew',
    //     likes: ['Biking', 'Cities']
    // });
    response.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to node-web-server'
    });

});

app.get('/about', (request, response)=>{
    response.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (request, response)=>{
    response.send({errorMessage:'Unable to handle request.'});
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
}); // listens on port 3000