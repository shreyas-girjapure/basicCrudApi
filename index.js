const express = require("express");
const userList = require("./userdata");
const app = express();
const port = 3000;
const uuid = require("uuid");

//use
app.use(express.json());

//Paths
//Read
app.get("/api", (req, res) => {
  res.json(userList);
});

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  const isPresent = userList.some((user) => user.id === +id);
  if (isPresent) {
    const userData = userList.filter((user) => user.id === +id);
    res.json(userData);
  } else {
    res.send(`Entered id ${id} is not present`);
  }
});

//Create
app.post("/api/", (req, res) => {  
  const body = req.body;  
  if ((body.firstName && body.lastName)) {
    userList.push({
      id: uuid.v4(),
      firstName: body.firstName,
      lastname: body.lastName,
      email: body.email,
    });
    res.json(userList);
  } else {
    res.json({
      msg: "please enter valid details",
      validPrototype: "{firstName*,lastName*,email}",
      info: " * fields are mandatory",
    });
  }
});

//Delete
app.delete('/api/:id',(req,res)=>{
    const updatedList = userList.filter(user=>user.id !== +req.params.id);
    res.json(updatedList)
})

//Listen
app.listen(port, () => {
  console.log("application started");
});
