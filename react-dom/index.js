/*
 * @Author: fuzhenghao
 * @Date: 2021-09-15 14:19:21
 * @LastEditTime: 2021-09-15 17:40:24
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \react_piracy\react-dom\index.js
 *
 */

//定义node节点
var ELEMENT_NODE = 1; //元素节点
var TEXT_NODE = 3; //文本节点
var COMMENT_NODE = 8; //注释节点
var DOCUMENT_NODE = 9; //文档节点
var DOCUMENT_FRAGMENT_NODE = 11; //特性节点

const ReactDOM = {
  render,
};

//校验转换后的jsx元素是否符合条件
function isValidContainer(node) {
  return !!(
    node &&
    (node.nodeType === ELEMENT_NODE ||
      node.nodeType === TEXT_NODE ||
      node.nodeType === COMMENT_NODE ||
      node.nodeType === DOCUMENT_NODE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE)
  );
}

//校验element数据是否符合条件
function isValidElement(element) {
  return !(element === undefined);
}

//属性挂载渲染
function setAttribute(value, attribute, dom) {
  //样式挂载
  key === "className" && (key = "class");
  //事件挂载
  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || "";
  }
  //内联样式挂载
  if (key === "style") {
    if (!value || typeof value === "string") {
      dom.style.cssText = value;
    } else if (value && typeof value === "object") {
      for (const key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
          const element = value[key];
          dom.style[key] =
            typeof element === "string" ? element : element + "px";
        }
      }
    }
  }
}

//由于可能是children递归调用了render函数，所以element的类型可能为object,string,number,undefined
function render(element, container) {
  //在这里对element进性校验是否通过数据类型验证
  if (!isValidElement(element)) {
    //校验失败
    {
      throw Error("当前容器不是一个DOM节点.");
    }
  }

  //在这里对container进性校验是否通过节点类型验证
  if (!isValidContainer(container)) {
    //校验失败
    {
      throw Error("当前容器不是一个DOM节点.");
    }
  }

  if (typeof element === "string" || typeof element === "number") {
    //创建文本节点
    const textNode = document.createTextNode(element);
    return container.appendChild(textNode);
  }

  //如果是虚拟DOM对象
  {
    let { tag, config } = vnode;
    //创建文本节点
    const dom = document.createElement(tag);
    //遍历属性
    if (config) {
      Object.keys(config).map((attribute) => {
        let value = config[attribute];
        setAttribute(value, attribute, dom);
      });
    }

    return container.appendChild(dom);
  }

  //callback();
}

export default ReactDOM;
