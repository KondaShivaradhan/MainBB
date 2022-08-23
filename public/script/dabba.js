function something() {
    var dabba = document.getElementsByClassName('dabba')
    for (let i = 0; i < dabba.length; i++) {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        dabba[i].style.backgroundColor ="#"+ randomColor
    }
}