/*
 * @Author: fuzhenghao
 * @Date: 2021-09-15 14:19:21
 * @LastEditTime: 2021-09-16 15:17:47
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \react_piracy\react-dom\index.js
 *
 */

import Component from "../react/component";

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
function setAttribute(value, attribute, dom_node) {
  //样式挂载
  if (attribute === "className") {
    attribute = "class";
  }

  //事件挂载
  if (/on\w+/.test(attribute)) {
    attribute = attribute.toLowerCase();

    dom_node[attribute] = value || "";
  }
  //内联样式挂载
  if (attribute === "style") {
    if (!value || typeof value === "string") {
      dom_node.style.cssText = value;
    } else if (value && typeof value === "object") {
      for (const attribute in value) {
        if (Object.hasOwnProperty.call(value, attribute)) {
          const element = value[attribute];
          dom_node.style[attribute] =
            typeof element === "string" ? element : element + "px";
        }
      }
    }
  } else {
    if (attribute in dom_node) {
      dom_node[attribute] = value || "";
    }
    // if (value) {
    //   dom_node.setAttribute(attribute, value, dom_node);
    // } else {
    //   dom_node.removeAttribute(attribute);
    // }
  }
}

//创建组件对象
function createComponent(comp, props) {
  //如果是类组件则创建实例返回
  let inst;
  if (comp?.prototype?.render) {
    console.log("类组件");
    inst = new comp(props);
  } else {
    //如果是函数组件则进行转换
    console.log("函数组件");
    inst = new Component(props);
    inst.constructor = comp;
    inst.render = function () {
      return this.constructor(props);
    };
  }
  return inst;
}

//组件对象属性挂载
function setComponentProps(comp, props) {
  comp.props = props;
  if (!comp.base) {
    console.log("componenetWillMount: 组件将要挂载");
    comp.componenetWillMount();
  } else if (comp.componenetWillReceiveProps) {
    console.log("componenetWillReceiveProps: 组件将要接收props数据");
    comp.componenetWillReceiveProps();
  }
  renderComponent(comp);
}

//渲染组件
export function renderComponent(comp) {
  const renderer = comp.render();

  if (comp.base && comp.componenetWillUpdate) {
    console.log("componenetWillUpdate: 组件将要更新");
    comp.componenetWillUpdate();
  }

  if (comp.base) {
    if (comp.componenetDidUpdate) {
      console.log("componenetDidUpdate: 组件更新完成");
      comp.componenetDidUpdate();
    }
  } else if (comp.componenetDidMount) {
    // BUG 这里的componenetDidMount应该放在render之后调用,位置有点问题
    console.log("componenetDidMount: 组件挂载完成");
    comp.componenetDidMount();
  }

  let base = _render(renderer);
  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base);
  }

  comp.base = base;
}

function _render(element) {
  //element内容处理
  //如果内容为string或number,非虚拟DOM对象
  if (typeof element === "string" || typeof element === "number") {
    //创建文本节点
    var dom_node = document.createTextNode(element);
  }

  //如果是函数组件
  if (typeof element.tag === "function") {
    //讲函数组件转换成类组件统一处理
    // 1.创建组件对象
    let comp = createComponent(element.tag, element.attribute);
    // 2.设置组件属性
    setComponentProps(comp, element.attribute);
    // 3.挂载组件
    var dom_node = comp.base;
  } else {
    //如果是虚拟DOM对象
    let { tag, config } = element;
    if (tag) {
      //创建文本节点
      var dom_node = document.createElement(tag);
      //遍历属性
      if (config) {
        Object.keys(config).map((attribute) => {
          let value = config[attribute];
          setAttribute(value, attribute, dom_node);
        });
      }
    }
  }

  //处理element.chidren子节点，进行递归处理
  {
    let { childrens } = element;
    if (element?.childrens) {
      childrens.map((child) => {
        render(child, dom_node);
      });
    }
  }

  return dom_node;
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

  return container.appendChild(_render(element));

  // TODO 这里有render回调需要实现
  //callback();
}

export default ReactDOM;
