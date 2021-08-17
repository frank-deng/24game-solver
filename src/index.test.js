import solve24game from './index';
import Calc from 'expression-calculator';

function calcStr(str){
    return new Calc(str).calc();
}
describe('24game test',function(){
    it('1,2,3,4',function(){
        for(let item of solve24game([1,2,3,4],24)){
            if(Math.abs(calcStr(item)-24)>0.0001){
                throw new Error(`${item} != 24`);
            }
        }
    });
    it('8,8,3,3',function(){
        for(let item of solve24game([8,8,3,3],24)){
            if(Math.abs(calcStr(item)-24)>0.0001){
                throw new Error(`${item} != 24`);
            }
        }
    });
    it('8,8,8',function(){
        for(let item of solve24game([8,8,8],24)){
            if(Math.abs(calcStr(item)-24)>0.0001){
                throw new Error(`${item} != 24`);
            }
        }
    });
    it('5,5,5,5,4',function(){
        for(let item of solve24game([5,5,5,5,4],24)){
            if(Math.abs(calcStr(item)-24)>0.0001){
                throw new Error(`${item} != 24`);
            }
        }
    });
});
