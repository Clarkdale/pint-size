const express = require('express');
const fetch = require("node-fetch");
var cors = require('cors');

// create the server
const app = express();
const port = process.env.PORT || 4003;

app.use(cors());

var map = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

var service = "https://smllr.herokuapp.com";

app.get('/:urlId', (request, response) => {  
    let curr;
    let init = request.params.urlId;
    let result = 0;

    for (let i = 0, j = init.length - 1; i < init.length && j >= 0; i++, j--) {
        curr = map.indexOf(init[i]);
        result += (curr * Math.pow(61, j));
    }
    console.log(result);
    fetch(`${service}/getUrl/${result}`)
        .then(res => {
            return res.json();
        })
        .then(x => {
            response.redirect(x);
        })
        .catch(e => response.status(500).send('The link could not be found'));
        
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));