//get input number(10~100), return {number}
function getNumber () {
    var num = document.querySelector("#getNumber");
    if(Number.isNaN(num.value) || Number(num.value)<10 || Number(num.value)>100){
       return 0;
    }
    return Number(num.value);
}

//create node of number, return {<li>number</li>}
function createNode(num) {
    var newNode = document.createElement("li");
    newNode.setAttribute('style', `height: ${num}px`);
    newNode.value = num;
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
        alert("请输入10~100");
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
        alert("请输入10~100");
    }
}

function popButton() {
    popNode();
}

function sortButton() {
    var sort = document.querySelector("#myList").children;
    var i = 0, j = 0;
    //冒泡算法可视化，超时调用模拟
    function delay() {
        if(j<sort.length-i-1 ){
            if(sort[j].value > sort[j+1].value){
                 sort[j].parentElement.insertBefore(sort[j+1], sort[j]);   
            }
            j++;
        }else if(i<sort.length-1){
            i++;
            j=0;
        }else{
            return;
        }
        setTimeout(delay, 100);
    }
    setTimeout(delay, 100);
}

function init() {

    var btnUnShift = document.querySelector("#myUnShift"); 
    var btnShift = document.querySelector("#myShift");
    var btnPush = document.querySelector("#myPush");
    var btnPop = document.querySelector("#myPop");
    var btnSort = document.querySelector("#sort");

    btnUnShift.onclick = unShiftButton;
    btnShift.onclick = shiftButton;
    btnPush.onclick = pushButton;
    btnPop.onclick = popButton;
    btnSort.onclick = sortButton;
}

window.onload = init;