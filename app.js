require('dotenv').config();
const mongoose = require('mongoose');
const next = require('next');
const { app, server } = require('./server');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();


nextApp.prepare().then(() => {

    app.all('*', (req, res) => nextHandle(req, res))

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {

            console.log('\nmongodb connected\n')

            server.listen(3000, () => console.log('server is running on http://localhost:3000'))

        })
        .catch(e => {
            console.log(e)
        })

})
