/*
 * @Author: fuzhenghao
 * @Date: 2021-09-15 10:18:37
 * @LastEditTime: 2021-09-15 15:00:33
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \react_piracy\react\index.js
 *
 */
const React = {
  createElement,
};

function createElement(tag, config, ...childrens) {
  return {
    tag,
    config,
    childrens,
  };
}

export default React;
