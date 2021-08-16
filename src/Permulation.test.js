import assert from 'assert';
import Permulation from './Permulation';

describe('Permulation',function(){
    it('Array without duplicated item',function(){
        assert.deepStrictEqual([
            ...new Permulation([0,1,2])
        ],[
            [0,1,2],
            [0,2,1],
            [1,0,2],
            [1,2,0],
            [2,1,0],
            [2,0,1],
        ]);
    });
    it('Array with duplicated item',function(){
        assert.deepStrictEqual([
            ...new Permulation([0,1,1])
        ],[
            [0,1,1],
            [1,0,1],
            [1,1,0],
        ]);
    });
});
