import { createRenderer } from "./renderer";

// 所有的dom渲染操作
export const nodeOptions = {
  querySelector,
  insert,
};
function querySelector(el) {
  return document.querySelector(el);
}
function insert(el, node) {
  el.appendChild(node)
}
export default function createApp(options) {
  const renderer = createRenderer(nodeOptions);
  return renderer.createApp(options);
}
