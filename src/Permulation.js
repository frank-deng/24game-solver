/*
计算全排列有递归算法，但此处需要使用状态机方式实现，故使用栈代替递归
 */
export default class Permulation{
    constructor(length){
        if(isNaN(length) || length<1){
            throw new TypeError('Length must be greater than 0');
        }
        this.__arr=Array(length);
        this.__reset();
    }
    __reset(){
        let len=this.__arr.length;
        for(let i=0; i<len; i++){
            this.__arr[i]=i;
        }
        this.__stack=[
            {
                start:0,
                i:0
            }
        ];
    }
    [Symbol.iterator](){
        return this;
    }
    __swap(a,b){
        let temp=this.__arr[a];
        this.__arr[a]=this.__arr[b];
        this.__arr[b]=temp;
        return this;
    }
    __push(start){
        this.__stack.push({
            start,
            i:start
        });
        return this;
    }
    __pop(){
        this.__stack.pop();
        return this.__stack.length;
    }
    __top(){
        return this.__stack[this.__stack.length-1];
    }
    next(){
        let arrLength=this.__arr.length-1;

        //处理完成了
        while(this.__stack.length){
            if(this.__top().start>arrLength){
                let value=this.__arr.slice();
                if(!this.__pop()){
                    break;
                }
                this.__swap(this.__top().start,this.__top().i);
                this.__top().i++;
                return {
                    done:false,
                    value
                };
            }

            if(this.__top().i>arrLength){
                if(!this.__pop()){
                    break;
                }
                this.__swap(this.__top().start,this.__top().i);
                this.__top().i++;
                continue;
            }
            
            this.__swap(this.__top().start,this.__top().i);
            this.__push(this.__top().start+1);
        }

        this.__reset();
        return {
            done:true
        }
    }
}
