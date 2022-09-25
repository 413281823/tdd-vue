import {reactive} from '../src/reactive'
describe('reactive', () => {
    test('reactive', () => {
        const obj = {
            foo: 'xxx'
        }
        const react = reactive(obj)
        expect(react).not.toBe(obj)
        expect(react.foo).toBe('xxx')
    });
    test('改变数据拦截响应', () => {
        const obj = {
            foo: 'xxx'
        }
        const react = reactive(obj)
        expect(react).not.toBe(obj)
        expect(react.foo).toBe('xxx')
        react.foo = 'yyy'
        expect(obj.foo).toBe('yyy')
        react.bar = 'bar'
        expect(obj.bar).toBe('bar')
        delete react.bar
        expect(obj.bar).toBe(undefined)
    });
});