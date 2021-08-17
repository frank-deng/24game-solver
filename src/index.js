import Permulation from './Permulation';
import RadixCycle from './RadixCycle';
import {
    RPNPermulation,
    RPNTree
}from './rpn';

export default function(a,b,c,d,goal){
    let arr=[a,b,c,d], result=[], resultTable={};
    arr.sort((a,b)=>{a-b});
    for(let numArr of new Permulation(arr)){
        for(let operIdxArr of new RadixCycle(4,3)){
            let opers=operIdxArr.map(i=>['+','-','*','/'][i]);
            for(let rpnTemplate of new RPNPermulation(4)){
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
