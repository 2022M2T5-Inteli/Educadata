const express = require('express'); 
const app = express();

const hostname = '127.0.0.1';
const port = 3080;
app.use(express.static("./front-end/"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});