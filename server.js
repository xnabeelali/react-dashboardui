const fs = require("fs");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const jwt = require("jsonwebtoken");
const path = require('path');
const middlewares = jsonServer.defaults({
  static: "./build",
});

const PORT = process.env.PORT || 5000;
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use('/api', router)


const SECRET_KEY = "xyz";
const expiresIn = "1h";

// setting dummy password for all users for verification
const DUMMY_PWD = '12345'

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ email, password }) {
  const usersDB = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  return (
    usersDB.users.findIndex((user) => user.email === email && DUMMY_PWD === password) !== -1
  );
}

server.use(jsonServer.bodyParser)

server.post("/auth/login", (req, res) => {
  const usersDB = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const { email, password } = req.body;
  
  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }
  const user = usersDB.users[usersDB.users.findIndex((user) => user.email === email && DUMMY_PWD === password)];
  const access_token = createToken({ email, password });

  res.status(200).json({ 
    "status": "success",
    "user": {
      "id": user.id,
      "email": user.email,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "avatar": user.avatar
    },
    "access_token": access_token
   });
});


server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if ((req.method === 'POST' && req.url === "/users")) {
    const usersDB = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    const { email } = req.body;
    const userExist = usersDB.users.findIndex((user) => user.email === email) !== -1;
    
    if (userExist) {
      const status = 401;
      const message = "User Already exist.";
      res.status(status).json({ status, message });
      return;
    }
  }
  // Continue to JSON Server router
  next()
})
if (process.env.NODE_ENV === "production") {
  server.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });

  server.get("/dashboard", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}


server.use(router);
server.listen(PORT, () => {
  console.log("Server is running");
});