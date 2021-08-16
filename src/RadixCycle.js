export default class RadixCycle{
    constructor(radix,count){
        if(isNaN(radix) || radix<=2){
            throw new TypeError('Radix must be a number greater than 1');
        }
        if(isNaN(count) || count<=0){
            throw new TypeError('Count must be a number greater than 0');
        }
        this.__radix=radix;
        this.__counter=Array(count);
        this.__reset();
    }
    __reset(){
        this.__counter.fill(0);
    }
    __inc(){
        let arr=this.__counter, radix=this.__radix;
        for(let i=arr.length-1; i>=0; i--){
            arr[i]++;
            if(arr[i]<radix){
                return true;
            }
            arr[i]=0;
        }
        return false;
    }
    *[Symbol.iterator](){
        let counter=2*this.__counter.length**this.__radix;
        while(counter--){
            yield this.__counter.slice();
            if(!this.__inc()){
                break;
            }
        }
        if(counter<=0){
            console.error('Dead loop detected');
        }
        this.__reset();
    }
}
