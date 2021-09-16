/*
 * @Author: fuzhenghao
 * @Date: 2021-09-15 10:18:37
 * @LastEditTime: 2021-09-16 11:17:15
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \react_piracy\react\index.js
 *
 */

import Component from "./component";

const React = {
  createElement,
  Component,
};

function createElement(tag, config, ...childrens) {
  return {
    tag,
    config,
    childrens,
  };
}

export default React;
