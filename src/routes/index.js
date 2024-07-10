const {
  createUser,
  authenticateUser,
  getUnknonRoute,
} = require("../controllers");

const userRoutes = (app) => {
  app.post("/api/create-user", createUser);
  app.post("/api/authenticate-user", authenticateUser);
  app.get("*", getUnknonRoute);
};

module.exports = userRoutes;
