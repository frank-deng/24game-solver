import Permulation from './Permulation';
import RadixCycle from './RadixCycle';
import {
    RPNPermulation,
    RPNTree
}from './rpn';

export default function(arr,goal){
    if(!Array.isArray(arr)){
        throw new TypeError('Invalid array parameter');
    }
    if(arr.length<3 || arr.length>6){
        throw new RangeError('Array parameter length must between 3 and 6.');
    }
    for(let item of arr){
        if(isNaN(item) || !item || item<1){
            throw new TypeError('Array items should be numbers greater than 1');
        }
    }
    if(isNaN(goal)){
        throw new TypeError('Goal must be number');
    }
    if(goal<0 || goal>99){
        throw new RangeError('Array parameter length must between 3 and 6.');
    }
    let result=[], resultTable={};
    arr=arr.slice();
    arr.sort((a,b)=>(a-b));
    for(let numArr of new Permulation(arr)){
        for(let operIdxArr of new RadixCycle(4,arr.length-1)){
            let opers=operIdxArr.map(i=>['+','-','*','/'][i]);
            for(let rpnTemplate of new RPNPermulation(arr.length)){
                let calcTree=new RPNTree(rpnTemplate,numArr,opers);
                let calcResult=calcTree.calc();
                if(null===calcResult || Math.abs(goal-calcResult)>0.01){
                    continue;
                }
                let expr=calcTree.toExpr();
                if(!resultTable[expr]){
                    resultTable[expr]=true;
                    result.push(expr);
                }
            }
        }
    }
    return result;
}
