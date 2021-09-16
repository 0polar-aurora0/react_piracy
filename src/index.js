/*
 * @Author: fuzhenghao
 * @Date: 2021-09-15 14:01:00
 * @LastEditTime: 2021-09-16 14:11:21
 * @LastEditors: fuzhenghao
 * @Description:首页挂载文件
 * @FilePath: \react_piracy\src\index.js
 *
 */
console.log("start project");

import React from "../react";
import ReactDOM from "../react-dom";
import Home from "./components/home";

const ele = (
  <div className="container" id="container">
    <Home name="home" />
    123456
    <div className="box">内容</div>
    <span className="box-introduce">介绍</span>
  </div>
);

ReactDOM.render(ele, document.querySelector("#root"));
