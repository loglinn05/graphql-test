import express from 'express'

const app = express()
app.get('/no-graphql', function (req, res) {
    res.send('This is a GET response.')
})
app.listen(4001, () => console.log('Server 1 is up and running on port 4001!'))