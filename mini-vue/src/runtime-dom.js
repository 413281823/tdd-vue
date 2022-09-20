import { createRenderer } from "./renderer";

// 所有的dom渲染操作
export const nodeOptions = {
  querySelector,
  insert,
  setElementText,
  setAttribute
};
function querySelector(el) {
  return document.querySelector(el);
}
function insert(el, node) {
  el.appendChild(node)
}
function setElementText(el, text) {
    el.textContent = text
}
function setAttribute(el,key,value){
    el.setAttribute(key,value)
}
export default function createApp(options) {
  const renderer = createRenderer(nodeOptions);
  return renderer.createApp(options);
}
