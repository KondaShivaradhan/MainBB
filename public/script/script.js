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