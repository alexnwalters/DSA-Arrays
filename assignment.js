const memory = require('./memory');
const Memory = new memory()

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = Memory.allocate(this.length)
    }

    push(value) {
      if(this.length >= this._capacity) {
          this._resize((this.length + 1) * Array.SIZE_RATIO)
      }
      Memory.set(this.ptr + this.length, value)
      this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr
        this.ptr = Memory.allocate(size);
        if(this.ptr === null) {
            throw new Error('Out of memory');
        }
        Memory.copy(this.ptr, oldPtr, this.length);
        Memory.free(oldPtr);
        this._capacity = size;
    }

    get(index) {
        if(index < 0 || index >= this.length) {
            throw new Error('Index Error');
        }
        return Memory.get(this.ptr + index)
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = Memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;       
    }

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }

        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }
}
// Array.SIZE_RATIO = 3;

function main(){

    Array.SIZE_RATIO = 3;

    // Create an instance of the Array class
    let arr = new Array();

    // Add an item to the array
    arr.push('tauhida');
    arr.push(5);
    arr.push(15);
    arr.push(19);
    arr.push(45);
    arr.push(10);

    arr.pop();
    arr.pop();
    arr.pop();

    console.log(arr.get(0));
}
// main();
// 2. arr.push(3) Array { length: 1, _capacity: 3, ptr: 0 }
// with other pushes Array { length: 6, _capacity: 12, ptr: 3 }
// the length is equal to the number of items, capacity changes when the 4th item exceeds the capacity of 3,
// the ptr 3 i snow set and the capacity increases to 12 ((ptr + 1)*3)
// so we can assume at item 13 or next time for a resize {length: 13, _capacity: 39, ptr: 12}

// 3. arr.pop()x3  Array { length: 3, _capacity: 12, ptr: 3 }
// the length is decreased with each pop()

// 4. arr.push('tauhida') prints as NaN, "this.memory = new Float64Array(1024)" defines the memory as an array of numbers
// the purpose of _resize() is to allocate memory to the new size of capacity = ((this.length + 1) * Array.SIZE_RATIO)

// 5. URLify
function URLify(string) {
    let newURI = encodeURIComponent(string)
    return newURI
};
let test_input_5 = 'tauhida parveen'
let test_input_5_a = 'www.thinkful.com /tauh ida parv een'
// console.log(URLify(test_input_5_a))
// O(n)

// 6. Filtering an Array
function rmvLessThanFive(arr, num) {
    let newArr = []
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] >= num) {
            newArr.push(arr[i])
        }
    }
    return newArr
}
let test_input_6 = [1,2,3,4,5,6,7,8,9]
let test_input_6_a = 5
// console.log(rmvLessThanFive(test_input_6, test_input_6_a))

// 7. Max sum continuous
function maxArrSum(arr) {
    let maxSum = 0
    let currentSum = 0 

    for(let i = 0; i < arr.length; i++) {
        currentSum = Math.max(0, currentSum + arr[i])
        maxSum = Math.max(currentSum, maxSum)
    }
    return maxSum
}
let test_input_7 = [4, 6, -3, 5, -2, 1]
//console.log(maxArrSum(test_input_7))

// 8. Merge Arrays
// function mergeArr(arr1, arr2) {
//     let newArr = []
//     let checks = (arr1.length + arr2.length)
//     for(let i = 0; i < checks; i++) {
//         if(arr1[0] <= arr2[0]) {
//             newArr.push(arr1.splice(0,1))
//         } else {
//             newArr.push(arr2.splice(0,1))
//         }
//     }

//     return newArr
// }

const mergeArr = (arr1, arr2) => {
    let newArr = [...arr1, ...arr2];
    newArr.sort((a,b) => {
      return a - b;
    });
    return newArr;
};

let test_input_8 = [1, 3, 6, 8, 11]
let test_input_8_a = [2, 3, 5, 8, 9, 10]
// console.log(mergeArr(test_input_8, test_input_8_a))

//9. Remove Characters
function rmvChars(str1, str2) {
    let newStr = str1

    for(let i = 0; i < str2.length; i++) {
        let regex = new RegExp(str2[i], "gi");
        newStr = newStr.replace(regex, '')    
    }

    return newStr
}
let test_input_9 = 'Battle of the Vowels: Hawaii vs. Grozny'
let test_input_9_a = 'aeiou'
// console.log(rmvChars(test_input_9, test_input_9_a))

// 10. product of other numbers in array - passed
function products(arr) {
    let newArr = []
    for(let i = 0; i < arr.length; i++) {
        let arrToMulitply = arr.splice(i, 1)
        console.log(arrToMulitply)
        let product = 1
        for(let j = 0; j < arrToMulitply.length; j++) {
            product = product * arrToMulitply[j]
        }

        newArr.push(product)
    }
    return newArr
}
let test_input_10 = [1, 3, 9, 4]
console.log(products(test_input_10))

//11. 2d array - skipped

//12. string rotation - skipped