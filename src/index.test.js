import solve24game from './index';
import Calc from 'expression-calculator/src';

describe('24game test',function(){
    it('1,2,3,4',function(){
        let calc=new Calc();
        for(let item of solve24game(1,2,3,4,24)){
            if(Math.abs(calc.compile(item).calc()-24)>0.01){
                throw new Error(`${item} != 24`);
            }
        }
    });
    it('8,8,3,3',function(){
        let calc=new Calc();
        for(let item of solve24game(8,8,3,3,24)){
            if(Math.abs(calc.compile(item).calc()-24)>0.01){
                throw new Error(`${item} != 24`);
            }
        }
    });
});
