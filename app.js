const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

mailchimp.setConfig({
  apiKey: "80dc2834c9bf00245fe8c4552395cd08-us18",
  server: "us18",
});

// Serve up static files such ass CSS and Images in our server
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a get route to the browser at localhost:3000
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// Signup route
app.post("/", function (req, res) {
  const listId = "e4fff56104";
  const subscribingUser = {
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
  };

  //   Construct requesting data

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    res.sendFile(__dirname + "/success.html");
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  }

  run().catch((e) => res.sendFile(__dirname + "/failure.html"));
});


app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

// Stringify inputed data

//   const jsonData = JSON.stringify(data);

//   const url = "https://us18.api.mailchimp.com/3.0/lists/e4fff56104;";

//   const options = {
//     method: "POST",
//     auth: "venus1:80dc2834c9bf00245fe8c4552395cd08-us18",
//   };

//   //   Request and send back data to MailChimp.
//   const request = https.request(url, options, function (response) {
//     response.on("data", function (data) {
//       console.log(JSON.parse(data));
//     });
//   });
//   request.write(jsonData);
//   res.end();
// });

// // API key for MailChimp
// 80dc2834c9bf00245fe8c4552395cd08-us18

// List ID  e4fff56104
