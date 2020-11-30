const sum = (() => {
    let result = 0;
    return (val) => {
        result += val;
        return result;
    }
    
})();

sum(6);
sum(6);
sum(6);
console.log(sum(6));

function prom() {
    return Promise.reject('ERROR').finally(() => {
        console.log('CALLED')
    })
}

function reRunPromise(prom,replayCount) {
    return prom().catch((err) => replayCount < 2 ? Promise.reject(err) : reRunPromise(prom,replayCount - 1))
}

reRunPromise(prom,5).then((val) => {
    console.log('KRAKADY', val)
})