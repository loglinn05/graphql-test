import express from 'express';
import { graphql } from 'graphql';
import bodyParser from 'body-parser'
import schema from './schema';

let app = express();
let port = 4002;
app.use(bodyParser.text({type: 'application/graphql'}))
/*
app.post('/no-graphql', (req, res) => {
    res.send('This is a POST response.');
});
*/
app.post('/graphql', (req, res) => {
    graphql({schema, source: req.body}).then((result) => {
        res.send(JSON.stringify(result, null, 2))
    });
})
let server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("GraphQL server is listening at http://%s:%s", host, port);
});