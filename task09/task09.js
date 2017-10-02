"use strict"

function main () {
    btnInit();
    let root = getRoot();
    root.addEventListener('click', function (event) {
        let focus = getFocus();
        if(focus)focus.className = 'normal';
        setFocus(event.target);
    });
}
//生成节点
function createNode (data) {
    let node = document.createElement("div");
    node.innerText = data;
    node.className = 'normal';
    return node;
}

function getRoot () {
    return document.querySelector("#root");
}

function insertChildren (root, ...children) {
    for(let i=0; i<children.length; i++){
        root.appendChild(createNode(children[i]));
    }
}
//用于默认生成
function newTree () {
    let root = getRoot();
    root.innerHTML = '';
    insertChildren(root, '世界');
    root = root.firstElementChild;
    insertChildren(root, '中国', '美国', '日本', '英国', '俄罗斯');
    insertChildren(root.children[0], '北京', '上海', '广州', '深圳');
    insertChildren(root.children[1], '纽约', '华盛顿');
    insertChildren(root.children[2], '东京');
    insertChildren(root.children[3], '伦敦');
    insertChildren(root.children[4], '莫斯科');
}
//先序遍历，返回遍历顺序
function preOrder (root, pre) {
    if(root){
        pre.push(root);
    }
    for(let i=0; i<root.children.length; i++){
        preOrder(root.children[i], pre);
    }
    return pre;
}
//后序遍历，返回遍历顺序
function postOrder (root, post) {
    for(let i=0; i<root.children.length; i++){
        postOrder(root.children[i], post);
    }        
    if(root){
        post.push(root);
    } 
    return post;
}
//对数据进行可视化处理
function display (node) {
    if(!node) return;
    if(getFocus()){
        setTimeout( () => {getFocus().className = 'normal';}, 500);
    }else{
        setTimeout(() =>{}, 500);
    }
    setTimeout( () => {setFocus(node);}, 500);
}
function manyDisplay (fn) {
    let i=-1;
    return function f(args) {
        i++;
        if(i<args.length){
            setTimeout(() => {fn(args[i]); f(args)}, 500);
        }
    }
}
//事件处理函数
function getFocus () {
    return document.querySelector(".focus");
}
function setFocus (node) {
    node.className = 'focus';
}
function getData () {
    return document.querySelector("#inData").value;
}
//按钮事件
function insertBtn () {
    let focus = getFocus();
    if(focus){
        let data = getData();
        if(data){
            focus.appendChild(createNode(data));
        }
    }
}
function deleteBtn () {
    getFocus().remove();
}
function queryBtn () {
    let data = getData();
    let method = [preOrder, postOrder];
    let i = Math.round(Math.random());
    let result = [];
    method[i](getRoot(), result);
    let f = result.length;
    for(let j=0; j<result.length; j++){
        if(result[j].firstChild.nodeValue === data){
            f=j;
            break;
        }
    }
    let myDisplay = manyDisplay(display);
    myDisplay(result.slice(0, f+1));
}
function preBtn () {
    let myDisplay = manyDisplay(display);
    let result = [];
    preOrder(getRoot(), result);
    myDisplay(result);
}
function postBtn () {
    let myDisplay = manyDisplay(display);
    let result = [];
    postOrder(getRoot(), result);
    myDisplay(result);
}
function btnListener (id, fn) {
    let btn = document.querySelector(id);
    btn.addEventListener('click', fn);
}

function btnInit () {
    btnListener('#btnInsert', insertBtn);
    btnListener('#btnDelete', deleteBtn);
    btnListener('#btnNewTree', newTree);
    btnListener('#btnQuery', queryBtn);
    btnListener('#btnPre', preBtn);
    btnListener('#btnPost', postBtn);
}
main();
