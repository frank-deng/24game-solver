import Permulation from "./Permulation";

export class RPNPermulation extends Permulation{
    constructor(numCount){
        if(isNaN(numCount)){
            throw new TypeError('numCount must be a number');
        }
        if(numCount<3){
            throw new RangeError('numCount must be greater than 2');
        }
        let arrPermulation=[];
        for(let i=0; i<numCount-2; i++){
            arrPermulation.unshift('n');
            arrPermulation.push('#');
        }
        super(arrPermulation);
    }
    __checkRPN(rpn){
        let stack=0;
        for(let item of rpn){
            if('n'==item){
                stack++;
            }else if('#'==item){
                stack--;
            }
            if(stack<=0){
                return false;
            }
        }
        return 1==stack;
    }
    *[Symbol.iterator](){
        while(1){
            let item=super.next();
            if(item.done){
                break;
            }
            let value='nn'+item.value.join('')+'#';
            if(this.__checkRPN(value)){
                yield value;
            }
        }
    }
}

class RPNLeaf{
    static OPER_PRIORITY={
        '+':10,
        '-':10,
        '*':20,
        '/':20
    };
    static OPER_EXCHANGEABLE={
        '+':true,
        '*':true
    };
    constructor(oper,left,right){
        Object.assign(this,{
            oper,left,right
        });
        if(left instanceof RPNLeaf){
            left.setParent(this,'left');
        }
        if(right instanceof RPNLeaf){
            right.setParent(this,'right');
        }
        
        //左右大小对调，针对加号和乘号
        if(RPNLeaf.OPER_EXCHANGEABLE[this.oper]
            || (this.parent && 'right'==this.parentLeaf && this.parent.oper==this.oper)){
            if(left instanceof RPNLeaf && right instanceof RPNLeaf){
                let vLeft=this.left.calc(), vRight=this.right.calc();
                if(vLeft>vRight){
                    let temp=this.left; this.left=right; this.right=temp;
                }
            }else if(left instanceof RPNLeaf && !(right instanceof RPNLeaf)){
                let temp=this.left; this.left=this.right; this.right=temp;
            }else if(!(left instanceof RPNLeaf) && !(right instanceof RPNLeaf) && left>right){
                let temp=this.left; this.left=this.right; this.right=temp;
            }
        }
    }
    setParent(parent,leaf){
        this.parent=parent;
        this.parentLeaf=leaf;
    }
    calc(){
        let vLeft=this.left, vRight=this.right;
        if(this.left instanceof RPNLeaf){
            vLeft=this.left.calc();
        }
        if(this.right instanceof RPNLeaf){
            vRight=this.right.calc();
        }
        if(null===vLeft || null===vRight){
            return null;
        }
        switch(this.oper){
            case '+':
                return vLeft+vRight;
            case '-':
                return vLeft-vRight;
            case '*':
                return vLeft*vRight;
            case '/':
                return vRight ? vLeft/vRight : null;
        }
    }
    toJSON(){
        return{
            oper:this.oper,
            left: (this.left instanceof RPNLeaf) ? this.left.toJSON() : this.left,
            right: (this.right instanceof RPNLeaf) ? this.right.toJSON() : this.right,
        };
    }
    toExpr(){
        let left=(this.left instanceof RPNLeaf) ? this.left.toExpr() : this.left,
            right=(this.right instanceof RPNLeaf) ? this.right.toExpr() : this.right;
        
        let result=`${left}${this.oper}${right}`;
        if(this.parent){
            if(RPNLeaf.OPER_PRIORITY[this.oper] < RPNLeaf.OPER_PRIORITY[this.parent.oper]
                || ('right'==this.parentLeaf && !RPNLeaf.OPER_EXCHANGEABLE[this.parent.oper])){
                result=`(${result})`;
            }
        }

        return result;
    }
}
export class RPNTree{
    constructor(template,nums,opers){
        nums=nums.slice();
        opers=opers.slice();
        let stackMain=[];
        for(let item of template){
            if('n'==item){
                let num=nums.shift();
                if(undefined===num){
                    throw new ReferenceError('Numbers insufficient');
                }
                stackMain.push(num);
            }else if('#'==item){
                let oper=opers.shift();
                if(undefined===oper){
                    throw new ReferenceError('Operands insufficient');
                }
                let right=stackMain.pop(), left=stackMain.pop();
                stackMain.push(new RPNLeaf(oper,left,right));
            }
        }
        if(1!=stackMain.length){
            throw new Error('Failed to process RPN');
        }
        this.__data=stackMain[0];
    }
    calc(){
        return this.__data.calc();
    }
    toJSON(){
        return this.__data.toJSON();
    }
    toExpr(){
        return this.__data.toExpr();
    }
}
