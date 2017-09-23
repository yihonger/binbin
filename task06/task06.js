//return {string[]}
function getInputText() {
    var inputText = document.querySelector("textArea");
    var str = /[\s\、\,\，\\\n]+/; //匹配分隔符
    inputText.value = inputText.value.replace(/^[\s\、\,\，\\\n]*|[\s\、\,\，\\\n]*$/g, ""); //去头尾分隔符
    var getText = inputText.value.split(str); //按分隔符分开
    inputText.value = "";
    return getText;
}
//new <li> 元素
function createNode(data) {
    var node = document.createElement("li");
    node.innerText = data;
    return node;
}
//参数为data[]
function createList(data, myList) {
    for(let i=0; i<data.length; i++){
        if(data[i]){
           myList.appendChild(createNode(data[i]));
        }
    }
}
//还原列表 list[]
function reSetList(list) {
    for(let i=0; i<list.length; i++){
        list[i].innerHTML = list[i].innerText;
    }    
}
//按钮事件
function submitBtn() {
    var data = getInputText();
    var myList = document.querySelector("#myList");
    createList(data, myList);
}
function queryBtn() {
    //还原列表，覆盖上一次查询记录
    var list = document.querySelector("#myList").children;
    reSetList(list);

    var key = document.querySelector("#queryInput");
    var regKey = new RegExp(`${key.value}`,"g");
    for(let i=0; i<list.length; i++){
        if(regKey.test(list[i].innerText)){
            list[i].innerHTML = list[i].innerText.replace(regKey, `<span class="red">${key.value}</span>`);
        }
    }
}
function clearBtn() {
    var list = document.querySelector("#myList");
    list.innerHTML = "";
}

function btnInit() {
    var btnSubmit = document.querySelector("#btnSubmit");
    var btnQuery = document.querySelector("#btnQuery");
    var btnClear = document.querySelector("#btnClear");

    btnSubmit.onclick = submitBtn;
    btnQuery.onclick = queryBtn;
    btnClear.onclick = clearBtn;
}

window.onload = btnInit;