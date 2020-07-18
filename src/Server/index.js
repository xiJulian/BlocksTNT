const express = require('express');
const { join } = require('path');

module.exports = bot => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(join(__dirname, 'public/')));
    app.set('views', join(__dirname, 'views/'));
    app.set('view engine', 'ejs');

    app.get('/', (req, res) => {
        res.send('soon');
    });

    app.listen(3000, () => console.log('Server started on http://localhost:3000/'));
}