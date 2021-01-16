
  function register()
  {
      
  var fname=document.getElementById("first").value;
  //var lname=document.getElementById("last").value;
  var mailId=document.getElementById("mail").value;
  var dob=document.getElementById("dob").value;
  var mob=document.getElementById("number").value;
  var user=document.getElementById("uname").value;
  var pass=document.getElementById("pass").value;
  var nation=document.getElementById("nation").value;
  console.log(nation);
  var db=firebase.database().ref();

    //user data
    db.child(user).child("info").set({
        Username:user,
        password:pass,
        FullName:fname,
        //LastName:lname,
        MailId:mailId,
        DOB:dob,
        Mobile:mob,
        Nation:nation,
    });

    //vaccine data
    var vac=firebase.database().ref("vaccine");
    vac.on('value',function(data){
    db.child(user).child("vaccine").set(data.val());
    });

    //history
    db.child(user).child("history").set("none");


  }