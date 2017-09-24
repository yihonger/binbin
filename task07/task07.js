//创建节点<div>
function createNode(data) {
    var node  = document.createElement("div");
    node.setAttribute("class", "green");
    node.value = data;
    return node;
}
//创建满二叉树
function fullTree(root, height) {
    if(height === 1){
        root.leftChild = 0;
        root.rightChild = 0;
        return;  
    } 
    var leftChild = createNode(1);
    var rightChild = createNode(1);
    root.leftChild = leftChild.value;
    root.rightChild = rightChild.value;
    root.appendChild(leftChild);
    root.appendChild(rightChild);
    fullTree(leftChild, height-1);
    fullTree(rightChild, height-1);
}
//先序遍历, treeNodes[]
function preOrder(root, treeNodes) {
    if(root){
        treeNodes.push(root);
    }
    if(root.leftChild){
        preOrder(root.firstChild,treeNodes); 
    }
    if(root.rightChild){
        preOrder(root.lastChild, treeNodes);
    }
}
//中序遍历
function inOrder(root, treeNodes) {
    if(root.leftChild){
        inOrder(root.firstChild,treeNodes); 
    }
    if(root){
        treeNodes.push(root);
    }
    if(root.rightChild){
        inOrder(root.lastChild, treeNodes);
    }    
}
//后序遍历
function postOrder(root, treeNodes) {
    if(root.leftChild){
        postOrder(root.firstChild,treeNodes); 
    }
    if(root.rightChild){
        postOrder(root.lastChild, treeNodes);
    }  
    if(root){
        treeNodes.push(root);
    }
}
//btn 事件
function btn(fn) {
    var root = document.querySelector("#root");
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
            return;
        }
        setTimeout(delay, 500);
    }
    setTimeout(delay, 500);

}
function createTreeBtn() {
    var height = document.querySelector("#height").value;
    if( !height || height<2 || height>5 ){ alert("请输入高度2~5"); return;};
    var root = document.querySelector("#root");
    root.innerHTML = "";
    fullTree(root, height);
}
function preBtn() {
    btn(preOrder);
}
function inBtn() {
    btn(inOrder);
}
function postBtn() {
    btn(postOrder);
}

function btnInit() {
    var btnCreateTree = document.querySelector("#btnCreateTree");
    btnCreateTree.onclick = createTreeBtn;

    var btnPre = document.querySelector("#btnPre");
    btnPre.onclick = preBtn;

    var btnIn = document.querySelector("#btnIn");
    btnIn.onclick = inBtn;

    var btnPost = document.querySelector("#btnPost");
    btnPost.onclick = postBtn;
}

window.onload = btnInit;