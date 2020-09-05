const express= require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){

  const fn=req.body.fn;
  const ln=req.body.ln;
  const email=req.body.email;

  const data={

    members:[
      {
      email_address: email,
      status:"subscribed",
      merge_flieds:{
        FNAME: fn,
        LNAME:ln,
      }

    }
  ]  //key value pairs
  };

  //convering into json

  const jsonData=JSON.stringify(data);

  //to post to external system https:request  takes options
  //to get data from external system https:get

//https.request(url,options,function(response)

const url= "https://us17.api.mailchimp.com/3.0/lists/6b4fb517b7";  //url

//options is js object

const options=
{
  method: "POST",
  //for post req to be success need to provide some authentication using API key using auth with
  //username(anything) and password(api key)
  auth:"manasa:e9823f5c78336d5d86f191bedfeb4350-us17"
}
const request = https.request(url,options,function(response)

{
  if(response.statusCode===200)
  {
    res.sendFile(__dirname + "/success.html")
  }

  else{
    res.sendFile(__dirname + "/failure.html")
  }

//now response
response.on("data",function(data)
{
  console.log(JSON.parse(data));
});
});

request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res)
{
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function()
{
  console.log("port running");
});


//e9823f5c78336d5d86f191bedfeb4350-us17   api

//6b4fb517b7  list id /audience id
