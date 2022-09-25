import { actveEffect } from "./effect"
const effects = []
export function reactive(obj){
  const react = new Proxy(obj,{
        get(target,key){
            effects.push(actveEffect)
            return Reflect.get(target,key)
        },
        set(target,key,value){
          const newValue =  Reflect.set(target,key,value)
            effects.forEach((item,_) => {
              item && item() 
            })
            return newValue
        },
        deleteProperty(target,key){
            const deleteValue = Reflect.deleteProperty(target,key)
            effects.forEach((item,_) => {
               item && item()
            })
           return deleteValue
        }
    })
    return react
}

