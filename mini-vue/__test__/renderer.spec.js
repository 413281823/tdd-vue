import { createRenderer, createAppAPI } from "../src/renderer";
import {nodeOptions} from '../src/runtime-dom'
describe("renderer", () => {
  test("renderer", () => {
    const renderer = createRenderer(nodeOptions);

    expect(typeof renderer.render).toBe("function");
    expect(typeof renderer.createApp).toBe("function");
  });
  test(" mount 执行 render", () => {
    const mock1 = jest.fn();
    const createApp = createAppAPI(mock1);
    expect(typeof createApp).toBe("function");
    createApp().mount();
    expect(mock1).toBeCalled();
  });
  test("", () => {
    const div = document.createElement("div");
    const renderer = createRenderer(nodeOptions);
    const app = renderer.createApp({
        setup() {
          return {
            title: "rourou",
          };
        },
        render() {
          const el = document.createElement("div");
          el.innerText = this.title;
          return el;
        },
      }).mount(div);
    expect(div.childNodes[0].innerText).toBe("rourou");
  });
  test("添加文本元素", () => {
    const div = document.createElement("div");
    const renderer = createRenderer(nodeOptions);
    const app = renderer.createApp({
        setup() {
          return {
            title: "liang",
          };
        },
        render() {
        
          return this.title;
        },
      }).mount(div);
    expect(div.textContent).toBe("liang");
  });
  test("添加元素属性", () => {
    const div = document.createElement("div");
    const renderer = createRenderer(nodeOptions);
    const app = renderer.createApp({
        setup() {
          return {
            title: "liang",
          };
        },
        render() {
            
          return {
            props:{
                id:'rourou'
            }
          };
        },
      }).mount(div);
    expect(div.id).toBe('rourou');
  });
  it('should effect update', () => {
    const div = document.createElement("div");
    const renderer = createRenderer(nodeOptions);
    const app = renderer.createApp({
        data(){
          return {
            title: "rourou",
          };
        },
        render() {
          const el = document.createTextNode(this.title)
          console.log(typeof el)
          return el;
        },
      }).mount(div);
      console.log(div.innerHTML)
    expect(div.innerHTML).toBe("rourou");
    app.title = 'reactive'
    expect(app.title).toBe('reactive')
    expect(div.innerHTML).toBe("reactive");
   
  });
});
