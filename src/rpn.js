export const RPN_TEMPLATE_LIST=[
    'nnnn###',
    'nnn#n##',
    'nnn##n#',
    'nn#nn##',
    'nn#n#n#'
];
export function rpn2bitree(template,nums=[],opers=[]){
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
            stackMain.push({
                left,
                right,
                oper
            });
        }
    }
    return stackMain[0];
}
export function calculateTree(tree){
    const _proc=(item)=>{
        let vLeft=null, vRight=null;
        if('object'==typeof(item.left)){
            vLeft=_proc(item.left);
        }else{
            vLeft=item.left;
        }
        if('object'==typeof(item.right)){
            vRight=_proc(item.right);
        }else{
            vRight=item.right;
        }

        if(null===vLeft || null===vRight){
            return  null;
        }

        switch(item.oper){
            case '+':
                return vLeft+vRight;
            case '-':
                return vLeft-vRight;
            case '*':
                return vLeft*vRight;
            case '/':
                if(!vRight){
                    return null;
                }
                return vLeft/vRight;
        }
    }
    return _proc(tree);
}
