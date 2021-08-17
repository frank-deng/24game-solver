import assert from 'assert';
import {
    RPNPermulation,
    RPNTree
}from './rpn';

describe('RPN test',function(){
    it('RPN template permulation',function(){
        assert.deepStrictEqual([
            ...new RPNPermulation(4)
        ],[
            'nnnn###',
            'nnn#n##',
            'nnn##n#',
            'nn#nn##',
            'nn#n#n#'
        ])
    });
    it('Generate tree',function(){
        assert.deepStrictEqual(
            new RPNTree(
                'nnnn###',
                [1,2,3,4],
                ['+','+','+']
            ).toJSON(),{
                left: 1,
                right: {
                    left: 2,
                    right: {
                        left: 3,
                        right: 4,
                        oper: '+'
                    },
                    oper: '+'
                },
                oper: '+'
            }
        );
        assert.deepStrictEqual(
            new RPNTree(
                'nnnn###',
                [1,2,3,4],
                ['+','+','-']
            ).toJSON(),{
                left: 1,
                right: {
                    left: 2,
                    right: {
                        left: 3,
                        right: 4,
                        oper: '+'
                    },
                    oper: '+'
                },
                oper: '-'
            }
        );
    });
    it('Calculate tree',function(){
        assert.strictEqual(
            new RPNTree('nnnn###',[1,2,3,4],['+','+','+']).calc(),
            10
        );
        assert.strictEqual(
            new RPNTree('nnnn###',[1,2,3,4],['+','+','-']).calc(),
            -8
        );
    });
    it('Zero division',function(){
        assert.strictEqual(
            new RPNTree('nnnn###',[1,2,3,0],['/','+','+']).calc(),
            null
        );
    });
});
