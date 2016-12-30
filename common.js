/**
 * Created by HUCC on 2016/7/22.
 */
/**
 * 获取元素的内部文本，兼容所有浏览器
 * @param element 元素
 * @returns {*} 内部文本
 */
function getInnerText(element) {
    //能力检测
    if (typeof element.innerText === "string") {
        //如果支持innerText，就返回innerText
        return element.innerText;
    } else {
        return element.textContent;
    }
}

/**
 * 设置元素的内部文本
 * @param element 元素
 * @param content 文本内容
 */
function setInnerText(element, content) {
    //能力检测
    if (typeof element.innerText === "string") {
        //如果支持innerText，就使用innerText
        element.innerText = content;
    } else {
        element.textContent = content;
    }
}

/**
 * 获取指定元素的子元素
 * @param element 指定元素
 * @returns {Array} 子元素数组
 */
function getChildElements(element) {
    var arr = [];
    //获取到所有的子节点
    var nodes = element.childNodes;
    //遍历
    for(var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        //判断是否是元素,就存到数组里面去
        if(node.nodeType === 1) {
            arr[arr.length] = node;
        }
    }
    return arr;
}


/*
//修复了nextElementSibling的兼容性问题
if(!("nextElementSibling" in document.documentElement)){
    Object.defineProperty(Element.prototype, "nextElementSibling", {
        get: function(){
            var e = this.nextSibling;//节点
            while(e && 1 !== e.nodeType)
                e = e.nextSibling;
            return e;
        }
    });
}
*/

/**
 * 获取指定元素的下一个兄弟元素
 * @param element 指定元素
 * @returns {*} 下一个兄弟元素
 */
function getNextElement(element) {
    //能力检测
    if(element.nextElementSibling){
        return element.nextElementSibling;
    } else {
        //不支持nextElementSibling，只能通过nextSibing来获取
        var node = element.nextSibling;//下一个节点

        //如果有下一个节点，并且下一个节点不是元素
        while(node && node.nodeType != 1) {
            node = node.nextSibling;
        }

        //找不到下一个节点了，或者找到了元素了
        return node;

    }
}

/**
 * 获取指定元素前一个兄弟元素
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    //能力检测
    if(element.previousElementSibling){
        return element.previousElementSibling;
    } else {
        //不支持previousElementSibling，只能通过previousSibing来获取
        var node = element.previousSibling;//前一个节点

        //如果有前一个节点，并且前一个节点不是元素
        while(node && node.nodeType != 1) {
            node = node.previousSibling;
        }

        //找不到前一个节点了，或者找到了元素了
        return node;

    }
}

//获取指定元素的第一个子元素
function getFirstElment(element) {
    //能力检测
    if (element.firstElementChild) {
        return element.firstElementChild;
    }else {
        //如果没有能，只能通过firstChild来找
        var node = element.firstChild;//节点
        while(node && node.nodeType !== 1) {
            node = node.nextSibling;
        }

        return node;
    }
}

//获取指定元素的最后一个子元素
function getLastElement(element) {
    //能力检测
    if(element.lastElementChild) {
        return element.lastElementChild;
    }else {
        var node = element.lastChild;
        while(node && node.nodeType !== 1) {
            node = node.previousSibling;
        }
        return node;
    }
}


//根据id获取元素
function $(id) {
    return document.getElementById(id);
}



//注册事件的兼容性封装
function addEventListener(element, type, fn) {
    //能力检测
    if (element.addEventListener) {
        //注册是事件都是冒泡
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        //所有浏览器都支持on的方式
        element["on" + type] = fn;
    }
}

//移除事件的兼容性封装
function removeEventListener(element, type, fn) {
    //能力检测
    if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + type, fn);
    } else {
        element["on" + click] = null;
    }
}


//获取事件对象
function getEvent(event) {
    return event || window.event;
}
//获取pageX，兼容IE678
function getPageX(event) {
    return event.pageX || event.clientX + document.documentElement.scrollLeft;
}
//获取pageY，兼容IE678
function getPageY(event) {
    if (event.pageY) {
        return event.pageY;
    } else {
        //在IE678里面是支持document.documentElement.scrollTop
        return event.clientX + document.documentElement.scrollTop;
    }
}

//阻止事件冒泡
function stopPropagation(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else {
        event.cancelBubble = true;
    }
}

function getTarget(event) {
    return event.target || event.srcElement;
}