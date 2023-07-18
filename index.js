/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */
// Packages
const app = require('./app');

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Port error', err);
  } else {
    console.log(`Server Listening on PORT ${PORT}`);
  }
});
