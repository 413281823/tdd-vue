import {effect} from '../src/effect'
import {reactive} from "../src/reactive"
describe('createApp should work', () => {
    it('should createApp update', () => {
        const obj = {
            foo:"foo"
        }
        const react = reactive(obj)
        let custom
        const mock1 = jest.fn(()=>{
         custom = react.foo
        })
        effect(mock1)
        expect(mock1).toHaveBeenCalledTimes(1)
        react.foo = 'foo2'
        expect(custom).toBe('foo2')
    
    });
    it('effect', () => {
        const obj = {
            num1:1,
            num2:2
        }
        const react = reactive(obj)
        let dummy
        effect(() => {
            dummy = react.num1 + react.num2
        })
        expect(dummy).toBe(3)
        react.num1 = 3
        react.num2 = 3
        expect(dummy).toBe(6)
    });
});