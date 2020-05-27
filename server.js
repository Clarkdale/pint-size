const express = require('express');
const fetch = require("node-fetch");
var cors = require('cors');

// create the server
const app = express();
const port = process.env.PORT || 4003;

app.use(cors());

var base61Map = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

var service = "https://smllr.herokuapp.com";

app.get('/:urlId', (request, response) => {  
    fetch(`${service}/getUrl/${convertBase10(request.params.urlId)}`)
        .then(res => {
            return res.json();
        })
        .then(x => {
            if (!(x.startsWith("http://") || x.startsWith("https://"))) {
                x = "http://" + x;
            }
            response.redirect(x);
        })
        .catch(e => response.status(500).send('The link could not be found'));
        
});

function convertBase10(base61Number) {
    let retVal = 0;
    let curr;
    for (let i = 0, j = base61Number.length - 1; i < base61Number.length && j >= 0; i++, j--) {
        curr = base61Map.indexOf(base61Number[i]);
        retVal += (curr * Math.pow(61, j));
    }

    return retVal;
}

// start the server
app.listen(port, () => console.log('Listening on port ' + port));