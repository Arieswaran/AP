var session=require("express-session");
var express=require("express");
var bodyParser=require("body-parser");
var app=express();
var mongo=require("mongodb").MongoClient;
var path=require("path");
var fs=require("fs");

var idk=0;

var urlencodedParser=bodyParser.urlencoded({ extended: false })
db_url="mongodb://aries:aj@ds121575.mlab.com:21575/ap"

app.use(session({
 secret:"God is love",
 resave:true,
 saveUninitialized:true
}));

app.use(express.static(path.join(__dirname, '/')));

/*
app.get('/',function(req,res){
 res.sendFile("index.html");
});

app.get('/login.html',function(req,res){
 res.sendFile("login.html");
});
*/

//login 
app.post('/process_login',urlencodedParser,function(req,res){
 var user={
  name:req.body.username,
  password:req.body.password
 }
 console.log("Logging in....\nName:%s\nPassword:%s",user.name,user.password);
 
 mongo.connect(db_url,function(err,db){
  if(err) throw err;
  db.collection("customers").findOne(user,function(err,result){
  if(result==null){
    fs.readFile('login.html',function(err,data)
		{
			if(err) throw err;
			data+=""; // To string
			var s=data.split("<arieswaran>");
			var datas="<script>\ndocument.getElementById('err').innerHTML='Your username or password is wrong';</script>";
			data=s[0]+datas+s[1];
			//res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
		});
    console.log("Login failed");
  }
  else
  {
    req.session.name=user.name;
    req.session.user=true;
    req.session.save();
    console.log(req.session);
    res.sendFile(__dirname+"/"+"shop.html");
    //res.redirect("http://localhost:8081/shop");
    //res.end();
  }
});
});
});

//sign up
app.post('/process_sign_up',urlencodedParser,function(req,res)
{
 var user={
  "name":req.body.username,
  "password":req.body.password,
  "email":req.body.email
 }
 mongo.connect(db_url,function(err,db)
 {
  if(err) throw err;
  db.collection("customers").findOne({name:user.name},function(err,result){
   if(err) throw err;
   if(result!=null)
   {
    res.send("Username already exists");
    res.end();
   }
   else
   {
    db.collection("customers").insertOne(user);
    db.close();
    console.log(user);
    req.session.name=user.name;
    req.session.user=true;
    req.session.save();
    //res.redirect("http://localhost:8081/shop");
    res.sendFile(__dirname+"/shop.html");
    //res.end();
   }
 });
});
});

var auth=function(req,res,next)
{
	if(req.session.user||idk==1) 
	{
		return next();
		idk=1;
	}
	else
	{
		console.log("User needs to login\n");
		console.log(req.session);
		console.log("sending login page");
		//Return login page with "You must login to shop";
		fs.readFile('login.html',function(err,data)
		{
			if(err) throw err;
			data+=""; // To string
			var s=data.split("<arieswaran>");
			var datas="<script>\ndocument.getElementById('err').innerHTML='You must sign in to shop';</script>";
			data=s[0]+datas+s[1];
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
			res.end();
		});
			
	}
}

//shop

app.get('/shop',auth,function(req,res)
{
	var name=req.session.name;
	console.log("/shop => session.name:");
	console.log(name);
	console.log(req.session);
	fs.readFile('shop.html',function(err,data)
	{
		if (err) throw err;
		data+=""; // To string
		var s=data.split("<arieswaran>");
		var datas="<script>\n";
		datas+="var name='"+req.session.name+"';\n";
		//end
		datas+="</script>";
		console.log(datas)
		data=s[0]+datas+s[1];
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		res.end();
	});
		
	
});

app.get('/select_category',auth,function(req,res)
{
	var name=req.session.name;
	console.log(req.query);
	//console.log(req.body)
	var aj=req.query.category;
	var filename;
	var name=req.session.name;
	console.log("/shop => session.name:");
	console.log(name);
	console.log(req.session);
	if(aj=="Teddy")
		filename="shop.html";
	else if(aj=="Dress")
		filename="shop1.html";
	else
		filename="shop2.html";
	fs.readFile(filename,function(err,data)
	{
		if (err) throw err;
		data+=""; // To string
		var s=data.split("<arieswaran>");
		var datas="<script>\n";
		datas+="var name='"+req.session.name+"';\n";
		//end
		datas+="</script>";
		console.log(datas)
		data=s[0]+datas+s[1];
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		res.end();
	});
		
	
});




app.get('/logout',function(req,res)
{
	req.session.destroy();
	idk=0;
	fs.readFile("Template.html",function(err,data)
	{
		if(err) throw err;
		data+="";
		s=data.split("<arieswaran>");
		datas="<br><br><br><br><br><br><center>You've been logged out successfully</center>";
		data=s[0]+datas+s[1];
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		res.end();
	});
});

app.get('/view',function(req,res)
{
	///////////////////////////////////////////////////////////////////////////////////Create view product
	console.log(req.query)
	var name=req.session.name;
	var prod_query=req.query.prod;
	fs.readFile("RIYA.txt",function(err,data)
	{
		if(err) throw err;
		data+="";
		data=JSON.parse(data);
		var product=data[prod_query];
		fs.readFile("view.html",function(err,result)
		{
			if(err) throw err;
			result+="";
			s=result.split("<arieswaran>");
			console.log(product);
			datas="<script>\nvar product=['"+product[0]+"','"+product[1]+"','"+product[2]+"','"+product[3]+"'];\n</script>";
			result=s[0]+datas+s[1];
			res.writeHead(200,{'Content-Type':'text.html'});
			res.write(result);
			res.end();
		});
	});
});



//listening
app.listen(8081,function(){console.log("App is listening on port 8081");});
 
  

