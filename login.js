const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public/css"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/login.html");
});

app.post("/", function(req, res){
const username = req.body.username;
const email = req.body.email;
const password =req.body.password;
const data = {
  members: [
    {
      email_address:email,
      status:"subscribed",
      merge_fields: {
        FNAME: username,
        LNAME: password,
      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const url = "https://us17.api.mailchimp.com/3.0/lists/969d776412";
const options = {
  method: "POST",
  auth: "ribhu1:adadc3bcd194ec54f8c9c964d1655c4b-us17"
}
const request = https.request(url,options,function(response) {
if (response.statusCode ===200) {
  res.sendFile(__dirname + "/success.html");
} else {
  res.sendFile(__dirname + "/failure.html");
}



  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
});

app.listen(process.env.PORT, function(){
  console.log("Server is running on port 3000");
});
