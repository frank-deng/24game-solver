import assert from 'assert';
import Permulation from './Permulation';

describe('Permulation',function(){
    it('Test 1',function(){
        assert.deepStrictEqual([
            ...new Permulation(3)
        ],[
            [0,1,2],
            [0,2,1],
            [1,0,2],
            [1,2,0],
            [2,1,0],
            [2,0,1],
        ]);
    });
});
