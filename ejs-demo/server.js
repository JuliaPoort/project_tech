require('dotenv').config() 

var express = require('express');
var app = express();

// set the view engine to ejs

app
  .use(express.urlencoded({extended: true})) // middleware to parse form data from incoming HTTP request and add form fields to req.body
  .use(express.static('static'))             // Allow server to serve static content such as images, stylesheets, fonts or frontend js from the directory named static
  .set('view engine', 'ejs')                 // Set EJS to be our templating engine
  .set('views', 'view')   

// Use MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
// Construct URL used to connect to database from info in the .env file
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
// Create a MongoClient
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
})

// Try to open a database connection
client.connect()
  .then(() => {
    console.log('Database connection established')
  })
  .catch((err) => {
    console.log(`Database connection error - ${err}`)
    console.log(`For uri - ${uri}`)
  })
// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function (req, res) {
  res.render('pages/about');
});
app.get('/formulier', (req, res) => {
  res.render('pages/formulier')
})
// formulier
app.get('/formulier', showForm)
app.post('/verwerkform', verwerkForm)

function showForm(req, res) {
  res.render('pages/formulier')
}

function verwerkForm(req, res) {
  const naamInput = req.body.name;
  const gebruikerGevonden = users.find(x => x.name === req.body.name)
 
  if (gebruikerGevonden) {
    console.log('Gebruiker gevonden:', gebruikerGevonden);

    if (gebruikerGevonden && gebruikerGevonden.wachtwoord === req.body.wachtwoord) {
      console.log('Login successful!')
      res.render('pages/index');
    } else {
      console.log('Invalid username or password')
      res.render('pages/formulier')

    }
  } else {
    console.log('Gebruiker niet gevonden');
    res.render('pages/formulier')

  }
}

app.listen(8080);
console.log('Server is listening on port 8080');