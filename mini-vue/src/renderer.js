// 创建渲染器 平台的元素操作
export function createRenderer({
    querySelector,
    insert,
    setElementText,
    setAttribute
}) {
  const render = (options, el) => {
    // 各平台的操作
    if (typeof el === "string" && el.startsWith("#")) {
      el = querySelector(el);
    }
    let { data, setup, render } = options;
    const ctx = {};

    if (setup) {
      ctx.setupState = setup();
    }
    if (data) {
      ctx.data = data();
    }
    const proxy = new Proxy(ctx, {
      get(target, key) {
        if (ctx.setupState && ctx.setupState.hasOwnProperty(key)) {
          return ctx.setupState[key];
        } else if (ctx.data && ctx.data.hasOwnProperty(key)) {
          return ctx.data[key];
        }
      },
    });

    const node = render.call(proxy);
    
    if (typeof node === 'string') {
        setElementText(el,node)
    } else if ( node instanceof Element){
        insert(el,node);
    } else if (typeof node === 'object') {
        if (node.props) {
            for (let key in node.props) {
                setAttribute(el,key,node.props[key])
            }
        }
       
    }
    
    
    // const exposed = instance.exposed || (instance.exposed = {})
    let exposed = {};
    if (options.exposed && options.exposed.length) {
      options.exposed.forEach((key) => {
        Object.defineProperty(exposed, key, {
          enumerable: true,
          get: () => proxy[key],
          set: (val) => (proxy[key] = val),
        });
      });
    } else {
      exposed = proxy;
    }

    return exposed;
  };
  const createApp = createAppAPI(render);
  return {
    render,
    createApp,
  };
}

export function createAppAPI(render) {
  return function createApp(options = {}) {
    return {
      mount(el) {
        return render(options, el);
      },
    };
  };
}
