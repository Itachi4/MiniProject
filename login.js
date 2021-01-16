
function login(){
    var user=document.getElementById("uname").value;
    var pass=document.getElementById("pass").value;
    var db=firebase.database().ref(user);
    db.on('value',function(data){
        if(data.val()==null){
            window.alert("Invalid User Name");
        }
        else{
            if(pass==data.val().info.password){
                window.open("home.html","_self");
                localStorage.setItem("username",user);
            }
            else{
                window.alert("wrong password");
            }
        }
    });
}
