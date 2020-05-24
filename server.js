const express = require('express');
var cors = require('cors');

// create the server
const app = express();
const port = process.env.PORT || 4003;

app.use(cors());

var map = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

app.get('/:urlId', (request, response) => {
    console.log(request.params.urlId);
    /*
    let curr;
    let init = request.params.urlId;
    let result = 0;

    for (let i = 0, j = init.length - 1; i < init.length && j >= 0; i++, j--) {
        curr = map.indexOf(init[i]);
        result += (curr * Math.pow(61, j));
    }
    db.getIdUrl(result)
        .then(x => {
            response.redirect(x);
        })
        .catch(e => {console.trace(); response.status(500).send('Could not find the designated link')});
    */
});

// start the server
app.listen(port, () => console.log('Listening on port ' + port));