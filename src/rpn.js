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
                oper,
                value:null
            });
        }
    }
    return stackMain[0];
}
