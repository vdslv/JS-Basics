const sum = (() => {
    let result = 0;
    return (val) => {
        result += val;
        return result;
    }
    
})();

// sum(6);
// sum(6);
// sum(6);

function prom() {
    return Promise.reject('ERROR').finally(() => {
        console.log('CALLED')
    })
}

function reRunPromise(prom,replayCount) {
    return prom().catch((err) => replayCount < 2 ? Promise.reject(err) : reRunPromise(prom,replayCount - 1))
}

// reRunPromise(prom,5).then((val) => {
//     console.log('KRAKADY', val)
// })

function uniqValue(arr) {
    // return arr.filter((el, ind) => ind === arr.lastIndexOf(el));
    return arr.reduce((acc, val) => {
        if(!acc.includes(val)) {
            acc.push(val);
        }
        return acc;
    }, [])
}

// console.log(uniqValue([1,2,3,4,5,6,7,8,2,3,3,3,34,5]));

function twoMaxValue(arr) {
    let sorted = arr.sort((a,b) => b - a);
    return [sorted[0], sorted[1]];
}

// console.log(twoMaxValue([33,55,788,233,568,231,789,54647]));
const findHttp = (str) => str.split(' ').filter((el) => el.startsWith('https://'));

// console.log(findHttp('asdasdasdasdasdas https://www.google.com/ sdasdasdasdasdasdasdasd https://github.com/ abrakadabrahttps'));

function fib(number) {
    return [...Array(number)].reduce((acc,val,ind) => {
        if(ind === 0) {
            acc.push(0)
        } else if (ind === 1) {
            acc.push(1)
        } else {
            acc.push(acc[ind-1] + acc[ind-2]);
        }
        return acc;
    }, []);
}

// console.log(fib(8));

function fibSum(number) {
    return fib(number).reduce((acc, val) => acc + val, 0)
}

// console.log(fibSum(8));

function yakusNumber(number) {
    return fib(number).includes(number);
}

// console.log(yakusNumber(2456))

function getFibFromIndex(index) {
    return fib(index+1)[index];
}

// console.log(getFibFromIndex(8))

const fnArr = [(val) => val * 2, (val) => val - 1, (val) => val + 11];

function compose(...args) {
    return function(number) {
        return args.reduceRight((acc, fn) => {
            return fn(acc);
        }, number)
    }
}

// console.log(compose(...fnArr)(5));

function pipe(...args) {
    return function(number) {
        return args.reduce((acc, fn) => {
            return fn(acc);
        }, number)
    }
}

// console.log(pipe(...fnArr)(5));

const curr = arg1 => arg2 => arg3 => arg1 + arg2 + arg3;

console.log(curr(1)(2)(3));