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
        let dummy1,dummy2
        effect(() => {
            dummy1 = react.num1
        })
        effect(() => {
            dummy2 = react.num2
        })
        expect(dummy1).toBe(1)
        expect(dummy2).toBe(2)
    });
});