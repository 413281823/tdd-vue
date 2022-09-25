 export let actveEffect;
 
 export function effect(fn){
   actveEffect = fn
    fn()
 }

