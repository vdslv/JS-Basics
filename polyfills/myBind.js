Function.prototype.bind1 = function(context, ...args) {
    let fn = this;
    return function(...args2) {
        fn.call(context, ...args, ...args2);
    }
}

Function.prototype.bind2 = function (constext) {
    var fn = this;
    var slice = Array.prototype.slice;
    var bindedArgs = slice.call(arguments, 1);
    return function () {
      return fn.apply(constext, bindedArgs.concat(slice(arguments)));
    };
  };

let a = {name: 'Ivan'};

function logFull(message, who, piska) {
    console.log(`${this.name} fuck you ${message} ${who} ${piska}`);
}

let logger = logFull.bind2(a, 'EBAT');
logger('GANDON', 'OLEG');