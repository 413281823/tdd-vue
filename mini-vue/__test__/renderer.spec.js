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
});
