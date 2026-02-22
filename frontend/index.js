import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from the frontend!');
});

app.listen(3000, () => {
    console.log('Frontend service is running on port 3000');
});