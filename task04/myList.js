//get input string of number, return {string}
function getNumber () {
    var num = document.querySelector("#getNumber");
    var checkNum = /^[-\+]?[0-9]+[\.]?[0-9]*$/; //only number
    if(checkNum.test(num.value)){
       return num.value;
    }
    return '';
}
//create node of numString, return {<li>numString</li>}
function createNode(numString) {
    var newNode = document.createElement("li");
    newNode.innerText = numString;
    newNode.onclick = function() {this.remove()};
    return newNode;
}
//head unShift
function unShiftNode(node) {
    var myList  = document.querySelector("#myList"); 
    myList.insertBefore(node, myList.firstChild);
}
//head shift
function shiftNode() {
    var myList  = document.querySelector("#myList"); 
    if(myList.firstChild){
        if(confirm(`Delete ${myList.firstChild.innerText} ?`)){
            myList.firstChild.remove();
        }
    }
}
// rear push
function pushNode(node) {
    var myList  = document.querySelector("#myList"); 
    myList.appendChild(node);
}
//rear pop
function popNode() {
    var myList  = document.querySelector("#myList"); 
    if(myList.lastChild){
        if(confirm("Delete "+ myList.lastChild.innerText + " ?") ){
            myList.lastChild.remove();
        }
    }
}
// functions of button onclick
function unShiftButton() {
    var numStr = getNumber();
    if(numStr){
       unShiftNode(createNode(numStr));
    }
    else{
        alert("illegal number!")
    }
}
function shiftButton() {
    shiftNode();
}
function pushButton() {
    var numStr = getNumber();
    if(numStr){
       pushNode(createNode(numStr));
    }
    else{
        alert("illegal number!")
    }
}
function popButton() {
    popNode();
}
function init() {

    var btnUnShift = document.querySelector("#myUnShift"); 
    var btnShift = document.querySelector("#myShift");
    var btnPush = document.querySelector("#myPush");
    var btnPop = document.querySelector("#myPop");

    btnUnShift.onclick = unShiftButton;
    btnShift.onclick = shiftButton;
    btnPush.onclick = pushButton;
    btnPop.onclick = popButton;
}
window.onload = init;