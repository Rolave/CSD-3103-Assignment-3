const app = require("./app");

const port = process.env.port || 3000;
const address = `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});
