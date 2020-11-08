// ---------------------  Delay  ----------------
const delay = (delayTime) => new Promise((resolve, reject) => setTimeout(() => resolve(), delayTime));

delay(1000).then(() => console.log("Hey!")) // → ‘Hey!’ in 1 second 

// ------------  Array of promises in series ----------
const runPromisesInSeries = (promises) => {
    const runFirstPromise = promises[0]();
    runFirstPromise.then(() => {
        if (promises.length > 1) runPromisesInSeries(promises.slice(1));
    })
}

runPromisesInSeries([ 
    () => delay(1000).then(() => { 
      console.log('message in 1 second') 
    }), 
    () => delay(2000).then(() => { 
      console.log('message in 3 seconds') 
    }) 
  ]); 
//   → ‘message in 1 second’ 
//   → ‘message in 3 seconds’ 
  
// -------------------- Building Promise.all --------------------

function Promise_all(promises) { 
  return new Promise((resolve, reject) => { 
        let result = [];
        let counter = 0;

        if(!promises.length) {
            resolve(result);
        } else {
            promises.forEach((promise, index) => {
                promise
                    .then(val => {
                            result[index] = val;
                            counter++;
    
                        if(counter === promises.length) {
                            resolve(result);
                        }
                    })
                    .catch(err => {
                        reject(new Error(err));
                    })
            })
      };
    });
}

Promise_all([]).then(array => { 
  console.log("This should be []:", array); 
}); 

function soon(val) { 
  return new Promise(resolve => { 
    setTimeout(() => resolve(val), Math.random() * 500); 
  }); 
} 

Promise_all([soon(1), soon(2), soon(3)]).then(array => { 
  console.log("This should be [1, 2, 3]:", array); 
}); 

Promise_all([soon(1), Promise.reject("X"), soon(3)]) 
  .then(array => { 
    console.log("We should not get here"); 
  }) 
  .catch(error => { 
    if (error != "X") { 
      console.log("Unexpected failure:", error); 
    } 
  }); 

// --------------------  Fibonacci ---------------------
function* fibonacci(number) {
    let result = [];
    for (let i = 0; i < number; i++) {
        if (i === 0) {
            result[i] = 0;
            yield result[i];
        } else if (i === 1) {
            result[i] = 1;
            yield result[i];
        } else {
            yield result[i] = result[i - 2] + result[i - 1]
        }
    }

}

let [...first10] = fibonacci(10); 
console.log(first10); // → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] 

// ------------------  Generator helper  ------------------
function helper(generator) {
    const iterator = generator();
    function iterate(item) {
        if(item.done) return iteration.value;
        const promise = item.value;
        promise
            .then((x) => iterate(iterator.next(x)))
            .catch(err => iterator.throw(err));
    }
    return iterate(iterator.next());
}

const asyncTask1 = () => new Promise((resolve, reject) => setTimeout(() => resolve('first resolved'), 1000)); 
const asyncTask2 = () => new Promise((resolve, reject) => setTimeout(() => resolve('second resolved'), 1000)); 
const asyncTask3 = () => new Promise((resolve, reject) => setTimeout(() => reject('third rejected'), 1000)); 
console.log('invoke helper') 

helper(function* main() { 
 try { 
   const a = yield asyncTask1(); 
   console.log(a); 
   const b = yield asyncTask2(); 
   console.log(b); 
   const c = yield asyncTask3(); 
 } catch(e) {
   console.error('error happened', e); 
 } 
}); 

// → ‘invoke helper’ 
// 1000ms after helper invoked → ‘first resolved’ 
// 2000ms after helper invoked → ‘second resolved’ 
// 3000ms after helper invoked → ‘error happened third rejected’ 
