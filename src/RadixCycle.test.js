import assert from 'assert';
import RadixCycle from './RadixCycle';

describe('Radix Cycling Test',function(){
    it('Test 1',function(){
        assert.deepStrictEqual([
            ...new RadixCycle(3,2)
        ],[
            [0,0],
            [0,1],
            [0,2],
            [1,0],
            [1,1],
            [1,2],
            [2,0],
            [2,1],
            [2,2],
        ]);
    });
    it('Test 2',function(){
        assert.deepStrictEqual([
            ...new RadixCycle(3,3)
        ],[
            [0,0,0],
            [0,0,1],
            [0,0,2],
            [0,1,0],
            [0,1,1],
            [0,1,2],
            [0,2,0],
            [0,2,1],
            [0,2,2],
            [1,0,0],
            [1,0,1],
            [1,0,2],
            [1,1,0],
            [1,1,1],
            [1,1,2],
            [1,2,0],
            [1,2,1],
            [1,2,2],
            [2,0,0],
            [2,0,1],
            [2,0,2],
            [2,1,0],
            [2,1,1],
            [2,1,2],
            [2,2,0],
            [2,2,1],
            [2,2,2],
        ]);
    });
});
