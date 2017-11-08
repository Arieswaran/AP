//This code is horrible.Written in a hurry. and I'm not proud of it.
//please ignore or delete console.log() . it's only for debugging purposes.
var r=0;                                  //round
var o=0;                                  //offer
var ap;
var usr;                  
$(document).ready(function(){
  $("#submit").click(function(){
    r+=1;
    check();
  });
  $('#next').hide();
  $('#game').hide();
  $('#next').click(function(){
    $(this).hide();
    play();
  });

});

function get_num(){
  var num;
  num=Math.floor(Math.random()*13+1);
  return num;
}

function play()
{
  document.getElementById("ap").innerHTML="AP : ";
  document.getElementById("result").innerHTML="";
  $("#opt").show();
  usr=get_num();
  ap=get_num();
  document.getElementById("user").innerHTML="User : "+usr;
}
function check()
{
  var val=document.getElementById("choice").value;
  var f=false;
  console.log("val="+val+"\nusr="+usr+"\nap="+ap);
  switch(val)
  {
   case '1': if(usr==ap){
             console.log("Equal");
             o+=1;
             f=true;
             }
             break;
   case '2': if(usr>ap){
             console.log("Greater than");
             o+=1;
             f=true;
             }
             break;
   case '3': if(usr<ap){
             console.log("less than");
             o+=1;
             f=true;
             }
             break;
   default:console.log("Kill me please");
  }
  document.getElementById("ap").innerHTML="AP : "+ap;
  $("#opt").hide();
  if(f)
  document.getElementById("result").innerHTML="Congractulations! You won this round. Your extra discount = "+(o-1)+" + 1 = "+o+"%";
  else
  document.getElementById("result").innerHTML="Sorry! You lost in this round. Your extra discount = "+o+"%";
  if(r<3)
  $("#next").show();
  else
  end();  
}

function end()
{
 var dis=document.getElementById("prod_dis").innerHTML;
 dis=dis.slice(1);
 dis=Number(dis);
 document.getElementById("end").innerHTML="Game is over. Your total discount is "+(dis+o)+"%";
}

