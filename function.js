// 兼容性，为配合IE6查找类名
// function getClass(classname,obj){
//     var obj=obj||document;
//     if(obj.getElementsByClassName){
//     	return obj.getElementsByClassName(classname);
//     	}else{
//             var arr=[];
//             var doms=obj.getElementsByTagName("*");
//             for(var i=0;i<doms.length;i++){
//             	if(doms[i].className==classname){
//             		arr.push(doms[i]);
//             	}
//             }
//     	return arr;
//     }
// }
// window.onload=function(){
//         var t=getClass("box").length;
//         alert(t);
//     }

// 更高级的查找类名（多类名查找）

function getClass(classname,obj){
    var obj=obj||document;
    if(obj.getElementsByClassName){
        return obj.getElementsByClassName(classname);
        }else{
            var arr=[];
            var doms=obj.getElementsByTagName("*");
            for(var i=0;i<doms.length;i++){
                if(checkClass(classname,doms[i])){
                    arr.push(doms[i]);
                }
            }
        return arr;
    }
}
function checkClass(classname,obj){
	var classStr=obj.className;
	var classArr=classStr.split(" ");
	for(var i=0;i<classArr.length;i++){
		if(classArr[i]==classname){
            return true;
        }
	}return false;
}
// window.onload=function(){
//         var t=getClass("one").length;
//         alert(t);
//     }
// 获取内容
function getTextContent(obj){
   if(obj.innerTxet){
    return obj.innerTxet;
   }else{
    return obj.textContent;
   }
}
// 获取样式
function getStyle(obj,style){
    if(obj.currentStyle){
        return obj.currentStyle[style];
    }else if(getComputedStyle(obj,null)){
        return getComputedStyle(obj,null)[style];
    }
}
// $函数
function $(val,obj){
    if(typeof val=="string"){
         var obj=obj||document;
            val.replace(/^\s*|\s*$/g,"");
        if(val.charAt(0)=="#"){
            return document.getElementById(val.slice(1));
        }else if(val.charAt(0)=="."){
            return getClass(val.slice(1))
        }else if(/^[a-zA-Z][a-zA-Z0-9]{0,9}$/.test(val)){
            return obj.getElementsByTagName(val)
        } 
    }else if(typeof val=="function"){
        window.onload=function(){
            val();
        }
    }
  
}
// 去子节点
function getChilds(obj,type){
    var type=type||"no";
    var kids=obj.childNodes;
    var arr=[];
    for(var i=0;i<kids.length;i++){
        if(type=="no"){
            if(kids[i].nodeType=="1"){
                arr.push(kids[i]);
            }
        }else if(type=="yes"){
            if(kids[i].nodeType=="1"||kids[i].nodeType=="3"&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
                arr.push(kids[i]);
            }
        }
    }
    return arr;
}
// 拿到第一个
function getFirst(obj,type){
    var type=type||"no";
    return getChilds(obj,type)[0];
}
// 拿到最后一个
function getLast(obj,type){
    var type=type||"no";
    var childs=getChilds(obj,type);
    return childs[childs.length-1];
}
// 拿到第N个
function getNub(obj,n,type){
    var type=type||"no";
    var childs=getChilds(obj,type);
    if(n>childs.length||n<1){
        return false;
    }
    return childs[n-1];
}
// 拿兄弟节点
function getNext(obj,type){
    var type=type||"no";
    var next=obj.nextSibling;
    if(type==null){
        return false;
    }
    if(type=="no"){
        while(next.nodeType=="3"||next.nodeType=="8"){
            next=next.nextSibling;
            if(next==null){
                return false;
            }
        }
        return next;
    }
    if(type=="yes"){
        while(next.nodeType=="3"&&!next.nodeValue.replace(/^\s*|\s*$/g)||next.nodeType=="8"){
            next=next.nextSibling;
            if(next==null){
                return false;
            }
        }
        return next;
    }   
}
// 获取上一个兄弟元素
function getPrevious(obj,type){
    var type=type||"no";
    var previous=obj.previousSibling;
    if(type==null){
        return false;
    }
    if(type=="no"){
        while(previous.nodeType=="3"||previous.nodeType=="8"){
            previous=previous.previousSibling;
            if(previous==null){
                return false;
            }
        }
        return previous;
    }
    if(type=="yes"){
        while(previous.nodeType=="3"&&!previous.nodeValue.replace(/^\s*|\s*$/g)||previous.nodeType=="8"){
            previous=previous.previousSibling;
            if(previous==null){
                return false;
            }
        }
        return previous;
    }
}
// 插入到某个对象之前
function insertBefore(obj,beforeObj){
    var parent=beforeObj.parentNode;
    parent.insertBefore(obj,beforeObj);
}
// 插入到某个对象之后
function insertAfter(obj,afterObj){
    var parent=afterObj.parentNode;
    var next=getNext(afterObj,"yes")
    if(!next){
        parent.appendChild(obj);
    }else{
        parent.insertBefore(obj,next);
    }

}