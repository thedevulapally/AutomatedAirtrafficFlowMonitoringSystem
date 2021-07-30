// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBnIGFSBBlBA1weMBNP78nMb4XeE3Hqx08",
    authDomain: "adsb-a471f.firebaseapp.com",
    projectId: "adsb-a471f",
    storageBucket: "adsb-a471f.appspot.com",
    messagingSenderId: "920170654173",
    appId: "1:920170654173:web:d0a11700c5e9cf31a22e34",
    measurementId: "G-YQS48F5CFX",
    databaseURL: "https://adsb-a471f-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const arrivalHead = ["airline","ADEP","ADES","SLDT","ELDT","ALDT","SIBT","EIBT","AIBT","status"];
const departHead = ["airline","ADES","ADEP","STOT","ETOT","ATOT","SOBT","EOBT","AOBT","status"];
var myDate = new Date();
var time = myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
var dd = String(myDate.getDate()).padStart(2, '0');
var mm = String(myDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = myDate.getFullYear();

today = dd + mm + yyyy;
//today = '26062021';
var welcome;
var h = myDate.getHours();
if(h<12){
    welcome = "GOOD MORNING!!";
}
else if(h>=12 && h<16){
    welcome = "GOOD AFTERNOON!!";
}
else if(h>=16){
    welcome = "GOOD EVENING!!";
}
else{
    welcome = "HELLO!!"
}
$('#jumbo').append(`<h1 class="display-3">${welcome}<h1>`);
const adbRef = firebase.database().ref('schedules/' + today +'/Arrival');
const ddbRef = firebase.database().ref('schedules/' + today +'/Departure');

function searchTables(sKey){
    $("#atbody .ADES").filter(function () {
        $(this).parent().toggle($(this).text().toLowerCase().indexOf(sKey.toLowerCase()) > -1)
    });

    $("#dtbody .ADEP").filter(function () {
        $(this).parent().toggle($(this).text().toLowerCase().indexOf(sKey.toLowerCase()) > -1)
    });
}
var airports = new Set();
function updateDD(){
    $('#ele').empty();
    // for (let item of airports){
    //      $('#ele').append(`<a class="dropdown-item" href="#">${item}</a>`);
    //      console.log(item);
    // }
     for (const val of airports) {
         $('#ele').append(`<a class="dropdown-item" onclick='searchTables("${val}")'>${val}</a>`);
     }

}
adbRef.on('value', snapshot => {

    if (snapshot.exists()) {
        $('#atbody').empty();
        data = snapshot.val();
        //console.log(data);
        for (const flight in data) {
            record = data[flight];
            //console.log(record);
            aid = 'a'+flight;
            $('#atbody').append(`<tr id="${aid}"><th scope="row">${flight}</t></tr>`);
            for (const detail in arrivalHead) {
                f = '#' +'a'+ flight;
                adkey = arrivalHead[detail];
                //console.log(adkey);
				if(adkey == "ADES") {
					//console.log("s");
					if(record[adkey]===undefined){
						$(f).append(`<td class="ADES">default hyd</td>`);
					}
					else{
						$(f).append(`<td class="ADES">${record[adkey]}</td>`);
                        airports.add(record[adkey]);
					}
				}
				else {
					if(record[adkey]===undefined){
						$(f).append(`<td>default</td>`);
					}
					else{
						$(f).append(`<td>${record[adkey]}</td>`);
					}
				}

            }

        }
    } else {
        console.log("No data available");
    }
    updateDD();
});


ddbRef.on('value', snapshot => {
    if (snapshot.exists()) {
        $('#dtbody').empty();

        data = snapshot.val();
        //console.log(data);
        for (const flight in data) {
            record = data[flight];
            //console.log(record);
            bid = 'd'+flight;
            $('#dtbody').append(`<tr id="${bid}"><th scope="row">${flight}</t></tr>`);
            for (const detail in departHead) {
                f = '#' +'d'+ flight;
                ddkey = departHead[detail];
                //console.log(record[dkey]);
				if(ddkey == "ADEP") {
					if(record[ddkey]===undefined){
						$(f).append(`<td class="ADEP">default</td>`);
					}
					else{
						$(f).append(`<td class="ADEP">${record[ddkey]}</td>`);
                        airports.add(record[adkey]);
					}
				}
				else {
					if(record[ddkey]===undefined){
						$(f).append(`<td>default</td>`);
					}
					else{
						$(f).append(`<td>${record[ddkey]}</td>`);
					}
				}

            }

        }
    } else {
        console.log("No data available");
    }
    updateDD();
});


$(document).ready(function (){
    $("#adsearch").on("keyup", function () {
		//console.log("l");
        var value = $(this).val().toLowerCase();
        $("#atbody .dest").filter(function () {
            $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});




$(document).ready(function () {
    $("#asearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#atbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#dsearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#dtbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });



	$("#dfsearch").on("keyup", function () {
		//console.log("l");
        var value = $(this).val().toLowerCase();
        $("#dtbody .from").filter(function () {
            $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


// const searchFocus = document.getElementById('asearch');
// const keys = [
//     { keyCode: 'AltLeft', isTriggered: false },
//     { keyCode: 'ControlLeft', isTriggered: false },
// ];

// window.addEventListener('keydown', (e) => {
//     keys.forEach((obj) => {
//         if (obj.keyCode === e.code) {
//             obj.isTriggered = true;
//         }
//     });

//     const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

//     if (shortcutTriggered) {
//         searchFocus.focus();
//     }
// });







var tmonth=["January","February","March","April","May","June","July","August","September","October","November","December"];

function GetClock(){
var d=new Date();
var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();

var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds();
if(nmin<=9) nmin="0"+nmin;
if(nsec<=9) nsec="0"+nsec;

var t = nhour+":"+nmin+":"+nsec+"";
var d = tmonth[nmonth]+" "+ndate+","+nyear;
$('.clock').html(`${t}<br>${d}`);
}

GetClock();
setInterval(GetClock,1000);

$(window).scroll(function(){
    var scrl=$(this).scrollTop();
    if(scrl>60){
      $('.navbar').addClass('navbar-anim');
      $('.brandname').addClass('brandnameafter');
      $('.navbtntoogler').removeClass('navbuttons');
      $('.navbtntoogler').addClass('navbuttonsafter');
    }else if(scrl<60){
      $('.navbar').removeClass('navbar-anim');
      $('.brandname').removeClass('brandnameafter');
      $('.navbtntoogler').removeClass('navbuttonsafter');
      $('.navbtntoogler').addClass('navbuttons');
    }
    if(scrl>180){
      $('.scrlupbtn').addClass('btnscrl');
    }else{
      $('.scrlupbtn').removeClass('btnscrl');
    }
  })

function scrltop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
const adminRef = firebase.database().ref('admin');
function adminLogin(){
    var uname = $('#uname').val();
    var pword = $('#pword').val();
    adminRef.get().then((snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val();
            for(let rec in data){
                record = data[rec];
                if(uname == record['username'] && pword == record['password']){
                    window.location.href = "./admin.html";
                }
                else{
                    $('#mssg').empty();
                    $('#uname').val('');
                    $('#pword').val('');
                    $('#mssg').append(`Incorrect Login Credentials<br>Try again`);
                }
            }
        }
      }).catch((error) => {
        console.error(error);
      });

}

function asubmit(){

    var flight = $('#aflightsel option:selected').text();
    var attr = $('#aattrsel option:selected'). text();
    var subref = firebase.database().ref('schedules/'+today+'/Arrival/'+flight);
    var uval = $('#avalue').val();

    subref.set({
        attr : uval
      }, (error) => {
        if (error) {
          confirm("Unsuccessful \n try again");
        } else {
          confirm("updated successfully");
        }
      });

}

function dsubmit(){
    var flight = $('#aflightsel option:selected').text();
    var attr = $('#aattrsel option:selected'). text();
    var subref = firebase.database().ref('schedules/'+today+'/Departure/'+flight);
    var uval = $('#avalue').val();

    subref.set({
        attr : uval
      }, (error) => {
        if (error) {
          confirm("Unsuccessful \n try again");
        } else {
          confirm("updated successfully");
        }
      });
}
