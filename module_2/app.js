// Currying
const mergeWords = first => second => third => fourth => () => `${first} ${second} ${third} ${fourth}`;

console.log(mergeWords('GNU')('is')('not')('Unix.')()); // Output: ‘GNU is not Unix.’

// Every/Some
let goodUsers = [ 
    { id: 1 }, 
    { id: 2 }, 
    { id: 3 } 
] 
// `checkUsersValid` is the function you'll define 
const checkUsersValid = (validUsers) => (usersToCheck) => usersToCheck.every(user => validUsers.some(el => el.id === user.id));

let testAllValid = checkUsersValid(goodUsers) 
testAllValid([ 
    { id: 2 }, 
    { id: 1 } 
]); // Output: true

testAllValid([ 
    { id: 2 }, 
    { id: 4 }, 
    { id: 1 } 
]); // Output: false

// Reduce
const inputWords = ['Apple', 'Banana', 'Apple', 'Durian', 'Durian', 'Durian']; 

const countWords = (arr) => arr.reduce((acc, el) =>  {
    acc[el] ? acc[el] += 1 : acc[el] = 1;
    return acc;
}, {})

console.log(countWords(inputWords)); // Output: { ‘Apple’: 2, ‘Banana’: 1, ‘Durian’: 3 }

// Palindrome
const isPalindrome = (str) => {
    let resultString = str === str.split('').reverse().join('') ? ' ' : ' not '

    return `Entry is${resultString}a palindrom`;
}

console.log(isPalindrome('madam')); // Output: ‘The entry is a palindrome’ 
console.log(isPalindrome('fox')); // Output: ‘Entry is not a palindrome’

// Recursion
const factorial = number => {
    if (number < 2) {
        return 1;
    } else {
        return number * factorial(number - 1);
    }
}

console.log(factorial(5)); // Output: 120

const amountToCoins = (sum, coins) => {
    const coin = coins.find((coin) => sum - coin >= 0);
    return coin ? [coin, ...amountToCoins(sum - coin, coins)] : [];
};

console.log(amountToCoins(46, [25, 10, 5, 2, 1])); // Output: [25, 10, 10, 1]

const repeat = (fn, number) => {
    if(number < 1) {
        return;
    } else {
        return fn(), repeat(fn, number - 1);
    }
}

repeat(() => console.log('Wassup'), 5); // Function should output ‘Wassup’ 5 times

function reduce(arr, cb, acc) {
    let result = acc;

    for (let i = 0; i < arr.length; i++) {
        result = cb(result,arr[i], i,arr);
    }

    return result;
}

console.log(reduce([1,2,3], function(prev, curr, index, arr) { 
    return prev + curr; 
}, 0));
// Output: 6 
