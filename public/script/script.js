$(document).on("click", 'a[href^="#"]', function(event) {
    event.preventDefault();
    $("html, body").animate({
            scrollTop: ($($.attr(this, "href")).offset().top + 400)
        },
        1000
    );
});

function search() {
    var val = document.getElementById('search').value
    var opps = document.getElementsByClassName('opp')
    for (let i = 0; i < opps.length; i++) {
        document.getElementById(opps[i].id).style.display = ""
    }
    for (let i = 0; i < opps.length; i++) {
        if (opps[i].id.includes(val.toUpperCase())) {
            console.log(opps[i].id);
        } else {
            document.getElementById(opps[i].id).style.display = "none"
        }
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
    document.getElementById("navi").style.height = "70px";
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
    if (document.getElementById("navi").offsetHeight == "70") {
        big();
    } else {
        small();
    }
}
async function live() {
    // async function getHeader() {
    //     const response = await axios.head(
    //         "https://www.youtube.com/channel/UCyyTvdpAOrbtJ3A0-3glGTA/live"
    //     );
    //     console.log(response.headers["content-length"]);
    // }
    // getHeader();
    // const myHeaders = new Headers();
    await fetch({ method: 'HEAD' }, "https://www.youtube.com/channel/UCyyTvdpAOrbtJ3A0-3glGTA/live")
        .then(response => console.log(response))
        //     // .then(data => console.log(data));
        //     // await fetch({ mode: 'cors' }, { method: 'HEAD' }, 'https://www.youtube.com/channel/UCyyTvdpAOrbtJ3A0-3glGTA/live')
        //     //     .then(response => console.log(response))
        //     // response.headers.get("content-length")
        //     //     .then(data => console.log(data));
}