import assert from 'assert';
import {
    RPN_TEMPLATE_LIST,
    rpn2bitree,
    calculateTree
}from './rpn';

describe('RPN test',function(){
    it('Generate tree',function(){
        assert.deepStrictEqual(
            rpn2bitree(
                RPN_TEMPLATE_LIST[0],
                [1,2,3,4],
                ['+','+','+']
            ),{
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
            rpn2bitree(
                RPN_TEMPLATE_LIST[0],
                [1,2,3,4],
                ['+','+','-']
            ),{
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
            calculateTree(rpn2bitree(
                RPN_TEMPLATE_LIST[0],
                [1,2,3,4],
                ['+','+','+']
            )),
            10
        );
        assert.strictEqual(
            calculateTree(rpn2bitree(
                RPN_TEMPLATE_LIST[0],
                [1,2,3,4],
                ['+','+','-']
            )),
            -8
        );
    });
    it('Zero division',function(){
        assert.strictEqual(
            calculateTree({
                left:1,
                right:{
                    left:1,
                    right:1,
                    oper:'-'
                },
                oper:'/'
            }),
            null
        );
    });
});
