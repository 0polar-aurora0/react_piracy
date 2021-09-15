/*
 * @Author: fuzhenghao
 * @Date: 2021-09-15 14:01:00
 * @LastEditTime: 2021-09-15 15:04:26
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \react_piracy\src\index.js
 *
 */
console.log("start project");

import React from "../react";
import ReactDOM from "../react-dom";

const ele = (
  <div className="container">
    123456
    <div className="box">内容</div>
    <span className="box-introduce">介绍</span>
  </div>
);

console.log(ele);

ReactDOM.render(ele, document.querySelector("#root"));
