localStorage.setItem("history","true");
localStorage.setItem("require","true");
function render(){
    var user=localStorage.getItem("username");
    console.log(user);
    var db=firebase.database().ref().child(user).child("info")
    db.on('value',function(data){
        var aaa=data.val();
        //window.alert(aaa.FirstName);
        var dob=aaa.DOB;
        dob=dob.split("-");
        var age=2020-dob[0];
        //window.alert(age);
        localStorage.setItem("country",aaa.Nation);

    document.getElementById("about").innerHTML=`
    <div class="row">
    <div class="col-md-6">
        <label>Name</label>
    </div>
    <div class="col-md-6">
        <p>${aaa.FullName}</p>
    </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <label>Email</label>
        </div>
        <div class="col-md-6">
            <p>${aaa.MailId}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <label>Phone</label>
        </div>
        <div class="col-md-6">
            <p>${aaa.Mobile}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <label>Age in years</label>
        </div>
        <div class="col-md-6">
            <p>${age}</p>
        </div>
    </div>
        `;
    });

        db.on('value',function(data){
            var aaa=data.val();
            //window.alert(aaa.FirstName);
            var dob=aaa.DOB;
            dob=dob.split("-");
            var age=2020-dob[0];
            //window.alert(age);
            localStorage.setItem("country",aaa.Nation);
    
        document.getElementById("pro").innerHTML=`
        <div class="profile-head">
                            <h5 style="color:white">
                                ${aaa.FullName}
                            </h5>
                            <br><br><br>
                    <ul class="nav nav-tabs" style="background:none" id="myTab" role="tablist">
                        <li class="nav-item" style="background:none">
                            <a class="nav-link active" id="required-tab" data-toggle="tab" href="#req" role="tab" aria-controls="home" aria-selected="true">Recommended</a>
                        </li>
                        <li class="nav-item" style="background:none">
                            <a class="nav-link " id="profile-tab" data-toggle="tab" href="#his" role="tab" aria-controls="his" aria-selected="false">History</a>
                        </li>
                        
                    </ul>
                </div>`;
        });

    //history part

    var db=firebase.database().ref(user).child("history");
    db.on('value',function(data){
        var history=data.val();
        var a=Object.keys(history);
        //console.log(a);
        var flag=localStorage.getItem("history");
        if(history!="none" && flag=="true")
        for(var i=0;i<23;i++){
            //console.log(a[i]);
            if(a[i]!=null){
                helper(a[i]);
            }
        }
        localStorage.setItem("history","false");
    });


    //required part
    var country=localStorage.getItem("country");
    var j=-1;
    if(country=="usa")  j=0
    if(country=="africa")  j=1
    if(country=="india")  j=2
    if(country=="canada")  j=3
    if(country=="dubai")  j=4
    var db=firebase.database().ref(user).child("vaccine");
    db.on('value',function(data){
        var vac=data.val();
        //console.log(vac);
        var k=Object.keys(vac);
        var v=Object.values(vac);
        var flag=localStorage.getItem("require");
        //console.log(v);
        for(var i=0;i<23;i++){
            //console.log(history.i.name);
            if(k[i]!=null && flag=="true"){
                var color="green";
                var c=v[i].country;
                var msg="Add at ease"
                //console.log(c);
                if(v[i].schedule-200<0){
                       color="red";
                       msg="ADD NOW"
                }
                if(v[i].taken==0 && c[j]==1){
                    helper1(k[i],v[i],color,msg);
                }
            }
        }
        localStorage.setItem("require","false");
    });


}
function helper(data){
    //console.log(data);
    document.getElementById("history").innerHTML+=`
    <div class="col-sm-9" >
        <div class="card" >
            <div class="card-body" style="border:2px solid green">
            <h5 class="card-title">${data}</h5>
            <!--<p class="card-text">${(data.taken==0)?"No":"Yes"}</p>-->
            </div>
        </div>
    </div>
    `
}
function helper1(key,data,color,msg){
    //console.log(data);
    console.log("asdfghj")
    document.getElementById("required").innerHTML+=`
    <div class="col-sm-3 p-1" style="float:left"  id="${data.name}d">
        <div class="card">
            <div class="card-body" id="${data.name}di" style="border-style:solid;border-color:${color};border-width: thin">
            <!--<div class="circle" style="background-color:${color};float:left"></div>-->
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">due in ${data.schedule} days</p>
            <button type="button"  class="btn btn-info" style="background-color:${color}" id="${data.name}" onclick="abcd(this.id)">${msg}</button>
            </div>
        </div>
    </div>
    `
}

