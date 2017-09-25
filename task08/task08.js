"use strict"

function myMain () {
    btnInit();
    var focus = document.querySelector("#root");
    var lastFocus = focus;
    
//用左子女，右兄弟 二叉树 存储 多叉树
function createNode (data) {
    var node = document.createElement("div");
    node.innerHTML = `<span>${data}</span>`;
    node.setAttribute("class", "green");
    node.child = null;  //左子女
    node.brother = null; //右兄弟
    node.firstChild.onclick = function () {
        lastFocus = focus;
        lastFocus.setAttribute("class", "green");
        focus = node;
        focus.setAttribute("class", "red");
    };
    return node;
}
function tree (root, arrayData) {
    var lastNode = null;
    for(let i=0; i<arrayData.length; i++){
        var node = createNode(arrayData[i]);
        if(i === 0){
            root.child = node;
        }
        if(lastNode){
            lastNode.brother = node;
        }
        lastNode = node;
        root.appendChild(node);
    }
    return root;
}
function myBigTree (root) {
    root.innerHTML = "<span>中国</span>";
    root.firstChild.onclick = function () {
        lastFocus = focus;
        lastFocus.setAttribute("class", "green");
        focus = root;
        focus.setAttribute("class", "red");
    };
    var province = ["北京", "上海", "广东", "浙江"];
    var city = ["广州", "深圳", "珠海", "惠州", "肇庆"];
    tree(root, province);
    tree(root.children[3], city);
    tree(root.children[4],["杭州"]);
}
//多叉树没有中序遍历
//先序遍历
function preOrder (root, arr) {
     if(root){
         arr.push(root);
     }
    if(root.child){
        preOrder(root.child, arr);
    }
    if(root.brother){
        preOrder(root.brother, arr);
    }
     return arr;
}
//后序遍历
function postOrder (root, arr) {
    if(root.child){
        postOrder(root.child, arr);
    }
    if(root){
        arr.push(root);
    }
    if(root.brother){
        postOrder(root.brother, arr);
    }
    return arr;
}
var pre = preOrder;
var post = postOrder;
function queryChild (data) {
    var method = [pre, post];
    var i = Math.floor(Math.random()+0.5);
    btn(method[i], data);
}

//btn onclick
function insertBtn () {
    var inData = document.querySelector("#inData").value;
    if(!inData) return;
    var node = createNode(inData);
    if(focus.child){//插入其他兄弟
        focus.lastChild.brother = node;
    }else{//插入老大
        focus.child = node;
    }
    focus.appendChild(node);
}
function deleteBtn () {
    if(focus != document.querySelector("#root")){
        //删除老大focus.parentElement.child
        if(focus.parentElement.child === focus){
            focus.parentElement.child = focus.brother;
        }else{//删除其他兄弟
            let f = focus.parentElement.child;
            while(f.brother !== focus){
                f = f.brother;
            }
            f.brother = focus.brother;
        }
        focus.remove(); 
        focus = document.querySelector("#root");  
    }
}
function newTreeBtn () {
    var root = document.querySelector("#root");
    root.innerHTML = "";
    var node = createNode("");
    root.child = node;
    root = root.appendChild(node);
    myBigTree(root);
}
function btn (fn, data=null) {
    var root = document.querySelector("#root").firstChild;
    if(!root) return;
    var treeNodes = [];
    fn(root, treeNodes);
    var i=0;
    function delay() {
        if(i>0){
            treeNodes[i-1].setAttribute("class", "green");
        }
        if(i<treeNodes.length){
            treeNodes[i].setAttribute("class", "red");
            i++;
        }else{
            return 0;
        }
        if(treeNodes[i-1].firstChild.innerText === data){
            lastFocus = focus;
            focus = treeNodes[i-1];
            return 1;
        }
        setTimeout(delay, 500);
    }
    setTimeout(delay, 500);

}
function preBtn () {
    focus.setAttribute("class","green");
    focus=lastFocus= document.querySelector("#root");
    btn(preOrder);
    focus.setAttribute("class","green");
    focus=lastFocus= document.querySelector("#root");
}
function postBtn () {
    focus.setAttribute("class","green");
    focus=lastFocus= document.querySelector("#root");
    btn(postOrder);
    focus.setAttribute("class","green");
    focus=lastFocus= document.querySelector("#root");
}
function queryBtn () {
    var data = document.querySelector("#inData").value;
    if(data){
        focus.setAttribute("class","green");
        focus=lastFocus= document.querySelector("#root");
        queryChild(data);   
    }   
}

function btnInit () {
    var btnNewTree = document.querySelector("#btnNewTree");
    btnNewTree.onclick = newTreeBtn;

    var btnInsert = document.querySelector("#btnInsert");
    btnInsert.onclick = insertBtn;

    var btnDelete = document.querySelector("#btnDelete");
    btnDelete.onclick = deleteBtn;

    var btnPre = document.querySelector("#btnPre");
    btnPre.onclick = preBtn;

    var btnPre = document.querySelector("#btnPre");
    var btnPost = document.querySelector("#btnPost");

    btnPre.onclick = preBtn;
    btnPost.onclick = postBtn;

    var btnQuery = document.querySelector("#btnQuery");
    btnQuery.onclick = queryBtn;
}
}
window.onload = myMain;