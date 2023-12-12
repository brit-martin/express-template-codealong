import express from "express";
import nunjucks from "nunjucks";
import lodash from "lodash";

const app = express();

const COMPLIMENTS = [
    'awesome',
    'terrific',
    'fantastic',
    'neato',
    'fantabulous',
    'wowza',
    'brilliant',
    'ducky',
    'coolio',
    'incredible',
    'wonderful',
    'smashing',
    'lovely',
  ];
//middle Ware
app.use(express.urlencoded({extended: false}))

nunjucks.configure("views", {
    autoescape: true,
    express: app
})
//DATA
app.get('/hello', (req, res) => {
    res.send('Hello!')
  });

app.post('/fav-number', (req, res) =>{
    const favNumber = req.body.favNumber;
    console.log('Saving favorite number to the database...')

    res.send(`Your favorite number is ${favNumber}.`)
})  

app.get('/users/:username', (req, res) => {
    const userName = req.params.userName;
    res.send (`Info page for user ${userName}`)
})



  //TEMPLATES
  app.get('/', (req, res) => {
    res.render('home.html');
  })
//----------display a form
  app.get('/form', (req, res) => {
    res.render('form.html');
  });
//-----------handle the form
app.get("/welcome", (req, res) => {
    const person = req.query.person;
    res.render('welcome.html.njk', {person});
  });

app.get("/number-form", (req, res) =>{
    res.render("number-from.html")
});

app.get('/template-demo', (req, res) => {
    const date = new Date();
    const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;
    res.render('template-demo.html.njk', {
      date: formattedDate,
    });
  });

app.get('/greet', (req, res) => {
    const person = req.query.person;
    const randomCompliments = lodash.sampleSize(COMPLIMENTS, 3);

    res.render('greet.html.njk', {
        name: person,
        compliments: randomCompliments
    })
});

app.get("/base", (req, res) => {
    res.render("base.html.njk")
});

app.get("/inherit", (req, res) => {
    res.render("inherit.html.njk")
});





app.listen('8000', () => {
    console.log('Server listening on port 8000!')
})