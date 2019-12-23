const express = require("express");
const config = require("./config");
const stripe = require("stripe")(config.privateStripe);
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs( { defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.render('index', {
        publicKey: config.publicStripe
    })
})

app.post('/charge', (req, res) => {
    const amount = 2500;
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description:"Web Development Ebook",
        currency: 'usd',
        customer: customer.id
    })).then(charge => res.render('success'))
} );

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
