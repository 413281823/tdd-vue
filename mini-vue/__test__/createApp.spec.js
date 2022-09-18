import {createApp} from "../src/index";
describe("createApp", () => {
  test("run createApp() should return App instance", () => {
    const app = createApp({});
    // app 是一个object
    // 拥有mount方法
    console.log(typeof app);
    expect(typeof app).toBe("object");
    expect(typeof app.mount).toBe("function");
  });
  test("", () => {
    const div = document.createElement("div");
    createApp({
      data() {
        return {
          title: "rourou",
        };
      },
      render() {
      
        const el = document.createElement("div");
        el.innerText = this.title;
        return el
      },
    }).mount(div);
    expect(div.childNodes[0].innerText).toBe('rourou');
  });
  test('mount 可以接受string', () => {
    const div = document.createElement("div");
    div.id='app'
    document.body.appendChild(div)
    createApp({
      setup() {
        return {
          title: "rourou",
        };
      },
      render() {
        const el = document.createElement("div");
        el.innerText = this.title;
        return el
      },
    }).mount('#app');
    expect(div.childNodes[0].innerText).toBe('rourou');
  });
  test('setup', () => {
    const div = document.createElement("div");
    createApp({
      setup() {
        return {
          title: "rourou",
        };
      },
      render() {
        const el = document.createElement("div");
        el.innerText = this.title;
        return el
      },
    }).mount(div);
    expect(div.childNodes[0].innerText).toBe('rourou');
  });
  test('app返回可以获取到setup和data里面的数据', () => {
    const div = document.createElement("div");
    const app = createApp({
      setup() {
        return {
          title: "rourou",
        };
      },
      data(){
        return {
            haodx:'haodx'
        }
      },
      exposed:['title','haodx'],
      render() {
        const el = document.createElement("div");
        el.innerText = this.title;
        return el
      },
    }).mount(div);
    console.log(app)
    expect(div.childNodes[0].innerText).toBe('rourou')
    
    expect(app.title).toBe('rourou');
    expect(app.haodx).toBe('haodx')
  });
});
