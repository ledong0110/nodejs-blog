const express = require('express');
const app = express();
const port = 3000;
//Route
app.get('/', (req, res) => {
    var a = 1;
    var b = 2;
    res.send('Hello World!')});

app.listen(port, () => console.log(`Example app Listening at http://localhost:${port}`));