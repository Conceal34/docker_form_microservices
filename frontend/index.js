import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const BACKEND_URL = process.env.BACKEND_URL || 'http://0.0.0.0:5000';

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/form', async (req, res) => {
    res.render('form')
})

app.post('/submit', async (req, res) => {
    // redirect to the backend service to process the form data
    try {
        const response = await fetch(`${BACKEND_URL}/insertData`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    name: req.body.name,
                    email: req.body.email
                }
            )
        });
        if (!response.ok) {
            throw new Error('Failed to process form data');
        }
    }
    catch (error) {
        console.error('Error processing form data:', error);
        res.render('form_failure');
    }

    res.redirect('/success');
});

app.get('/success', async (req, res) => {
    // enter the ejs variables
    try {
        const response = await fetch(`${BACKEND_URL}/getData`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error('Failed to retrieve data');
        }

        const data = await response.json();
        let dataName = data.name;
        let email = data.email;
        res.render('form_success', { name: dataName, email: email });
    }
    catch (error) {
        console.error('Error retrieving data:', error);
        res.render('form_failure');
    }
});

app.listen(3000, () => {
    console.log('Frontend service is running on port 3000');
});