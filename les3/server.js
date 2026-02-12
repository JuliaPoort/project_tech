const express = require('express')
const app = express()
const port = 3000
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/test', (req, res) => {
    res.send('fantastisch!')
  })
  app.get('/test2', (req, res) => {
    res.send('fantastisch!')
  })
  app.get('/profile/username:', (req, res) => {
    const username = req.params.username;
    res.send(`Welkom op het profiel van ${username}`);
});

app.use((req, res, next) => {
    res.status(404).send(`Sorry, 404 not found
        <img src="images/paard.jpg">`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 