var count;
console.log("Main js");
function imgstart()
{
 count=0;
 t=setInterval("imgchg()",2500);
}
function imgchg()
{
 var ele=document.getElementById("img");
 var img=["offer1.jpg","offer2.jpg","offer3.jpg","offer4.jpg"];
 if(count<4){
 ele.src="Photos/"+img[count];
 }
 else{
 count=-1;
 }
 count=count+1;
}
/*function login1()
{
 console.log("login");
 usr=document.getElementById("username");
 pwd=document.getElementById("password");
 //console.log(usr.value);
 //console.log(pwd.value);
 if(usr.value=="Priya" && pwd.value=="143"){
 return true;
 }
 else
 {
 document.getElementById("err").innerHTML="Username or Password is wrong";
 return false;
 }
}*/
function sign_up1()
{
 console.log("Signing up...");
 usr=document.getElementById("username").value;
 mail=document.getElementById("email").value;
 pwd=document.getElementById("password").value;
 pwd1=document.getElementById("password1").value;
 ele=document.getElementById("err");
 console.log(usr+" "+mail);
 if(pwd==pwd1)
 {
  re=/^\S+@\S+[\.]\S+$/;
  if(re.test(mail))
  {
   var msg="";
   var f=true;
   if(! /[0-9]/.test(pwd))
   f=false;
   if(! /[a-z]/.test(pwd))
   f=false;
   if(! /[A-Z]/.test(pwd))
   f=false;
   if(pwd.length<6)
   f=false;
   if(f==false)
   {
   ele.innerHTML="Password must contain atleast one lowercase letter , 1 uppercase letter and 1 digit and should be atleast 6 letters";
   }
   else
   {
   return true;
   }
  }
  else
  ele.innerHTML="Invalid email address";
 }
 else
 ele.innerHTML="Passwords does not match!";
 return false;
}
