const app = require('./server'); // exporte juste l'app
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`API backend en service sur le port ${port}`);
});
