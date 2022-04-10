function search() {
    var val = document.getElementById('search').value
    console.log(val);
    var opps = document.getElementsByClassName('opp')
    for (let i = 0; i < opps.length; i++) {
        if (opps[i].id.includes(val.toUpperCase())) {
            console.log(opps[i].id);
            document.getElementById(opps[i].id).style.display = ""
        } else {
            document.getElementById(opps[i].id).style.display = "none"
        }
    }
}
// instargram 
let loaddata = () => {
        fetch(`https://raw.githubusercontent.com/KondaShivaradhan/cloud/main/insta.json`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // console.log(data.games);
                // console.log(data.insta.followers);
                document.getElementById('nbr2').innerHTML = data.insta.followers;
                document.getElementById('gamesfetch').innerHTML = data.games;
            }).catch((err) => console.log(err));

    }
    // loaddata();
    // subcount
let getdata = () => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCPFM_Ug62Ei3CUfvquG4KOg&key=AIzaSyBVt2GmJFkuMANajEWKddIfyqKMfuJbuDA`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // console.log(data);
            document.getElementById('nbr').innerHTML = data["items"][0].statistics.subscriberCount;
            // viewCount.innerHTML = data["items"][0].statistics.viewCount;
            // videoCount.innerHTML = data["items"][0].statistics.videoCount;
        })
}
let getmem = () => {
    fetch(`https://www.googleapis.com/auth/youtube.channel-memberships.creator?part=statistics&id=UCPFM_Ug62Ei3CUfvquG4KOg&key=AIzaSyBVt2GmJFkuMANajEWKddIfyqKMfuJbuDA`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            // document.getElementById('nbr').innerHTML = data["items"][0].statistics.subscriberCount;
            // viewCount.innerHTML = data["items"][0].statistics.viewCount;
            // videoCount.innerHTML = data["items"][0].statistics.videoCount;
        })
}
getdata();
// oldest viewer
function old() {
    maxage = 1;
    var opps = document.getElementsByClassName('opp')
    for (let i = 0; i < opps.length; i++) {
        if (opps[i].id.includes(val.toUpperCase())) {
            console.log(opps[i].id);
            document.getElementById(opps[i].id).style.display = ""
        } else {
            document.getElementById(opps[i].id).style.display = "none"
        }
    }
}
// smooth scroll
$(document).on("click", 'a[href^="#"]', function(event) {
    event.preventDefault();
    $("html, body").animate({
            scrollTop: ($($.attr(this, "href")).offset().top + 400)
        },
        1000
    );
});
// increment animation
var speed = 10;

function incEltNbr(id) {
    elt = document.getElementById(id);
    endNbr = Number(document.getElementById(id).innerHTML);
    console.log(endNbr);
    if (endNbr > 1000) {
        incNbrRec(987, endNbr, elt);
    } else if (endNbr < 500) {
        incNbrRec(0, endNbr, elt);
    }
}


function incNbrRec(i, endNbr, elt) {
    if (i <= endNbr) {
        elt.innerHTML = i;
        setTimeout(function() {
            incNbrRec(i + 1, endNbr, elt);
        }, speed);
    }
}

function incNbr2() {
    incEltNbr("nbr2");
}

function incNbr3() {
    incEltNbr("nbr3");
}

function incNbr() {
    incEltNbr("nbr");
}

// incEltNbr("nbr");
// subcount increment start animatoin on view port
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    if ((window.scrollY + screen.height) > elemTop) {
        incNbr()
        incNbr2()
        window.onscroll = null;
    }
}


function myFunction() {
    // if (window.pageYOffset > 20) {
    //     small();
    // }
    small()
}

function small() {

    $('#ntext').hide().css({
        opacity: '1'
    });
    $("#navi").animate({
            backgroundColor: "linear-gradient(145deg,white,black,white)"
        },
        1000
    );
    // document.getElementById('scrolldiv').style.display = 'none';
    document.getElementById("small").style.display = 'flex';
    document.getElementById("svg").style.cssText = 'height:0%; width:0%;transition:all 0.3s';
    document.getElementById("rot").style.transition = "all 0.5s";
    document.getElementById("navi").style.height = "65px";
    document.getElementById("rot").style.transform = "rotate(" + 90 + "deg)";
}

function big() {
    console.log("big called");
    // document.getElementById('scrolldiv').style.display = '';
    document.getElementById("small").style.display = 'none';
    document.getElementById("svg").style.cssText = 'height:50%; width:50%;';
    $('#ntext').show();
    document.getElementById("navi").style.height = "100%";
    document.getElementById("rot").style.transform = "rotate(" + 270 + "deg)";
}

function navi() {
    if (document.getElementById("navi").offsetHeight == "65") {
        big();
    } else {
        small();
    }
}