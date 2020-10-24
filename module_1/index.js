// Change the capitalization of all letters in a string
const changeCase = (str) => str.split('')
    .map(el => el === el.toUpperCase() ? el.toLowerCase() : el.toUpperCase())
    .join('');

console.log(changeCase("21century")); // Output: 21CENTURY 
console.log(changeCase("Hybris")); // Output: hYBRIS 

// Filter out the non-unique values in an array
const filterNonUnique = (arr) => {
    let values = {};
    let result = []

    for (let i = 0; i < arr.length; i++) {
        if(values[arr[i]]) {
            values[arr[i]] += 1;
        } else {
            values[arr[i]] = 1
        }
    }

    for (const key in values) {
        if (values[key] === 1) {
            result.push(key);
        }
    }

    return result;
}

console.log(filterNonUnique([1, 2, 2, 3, 4, 4, 5])); // Output: [1,3,5] 
console.log(filterNonUnique([1, 2, 3, 4])); // Output: [1,2,3,4] 

// Sort string in alphabetical order
const alphabetSort = (str) => str.split('').sort().join('');

console.log(alphabetSort("Python")); // Output: ‘Phnoty’ 


// Get second min integer
const getSecondMiminum = (arr) => arr.sort()[1];

console.log(getSecondMiminum([5,0,7,3,8])); // Output: 3 

// Double every even integer
const doubleEveryEven = (arr) => arr.map((el) => el % 2 === 0 ? el * 2 : el)

console.log(doubleEveryEven([2,0,7,3,8,4])); // Output: [4,0,7,3,16,8]

// Create array with all possible pairs of two arrays
const getArrayElementsPairs = (arr1, arr2) => arr1.reduce((acc, el) => [...acc, ...arr2.map((el2) => [el,el2])], [])

console.log(getArrayElementsPairs([1, 2], ['a', 'b'])); // Output: [[1, “a”], [1, “b”], [2, “a”], [2, “b”]] 

// deepEqual
const deepEqual = (obj1, obj2) => {
    if(obj1 === obj2) {
        return true;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if(keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if(!obj2.hasOwnProperty(key)) {
            return false;
        }

        const areObjects = typeof obj1[key] === 'object' && typeof obj2[key] === 'object';

        if(areObjects && !deepEqual(obj1[key], obj2[key]) ||
            !areObjects && obj1[key] !== obj2[key]) {
            return false
        }
    }

    return true;
}

let obj = {here: {is: "an"}, object: 2}; 
console.log(deepEqual(obj, obj)); // Output: true 
console.log(deepEqual(obj, {here: 1, object: 2})); // Output: false 
console.log(deepEqual(obj, {here: {is: "an"}, object: 2})); // Output: true 

// formatDate
const formatDate = (date) => {
    let createdDate;
    let options = { day: '2-digit',  month: '2-digit', year: '2-digit' };

    const transformToString = (newDate) => {
            return newDate.toLocaleDateString('de-DE', options)
    }

    switch(true) {
        case date instanceof Array: 
        createdDate = new Date(...date);
            return transformToString(createdDate);

        case date instanceof Date: 
            return transformToString(date);

        case typeof date === 'string':
        case typeof date === 'number':
            createdDate = new Date(date);
            return transformToString(createdDate);
    }
}

console.log( formatDate('2011-10-02') ); // 02.10.11 
console.log( formatDate(1234567890000) ); // 14.02.09 
console.log( formatDate([2014, 0, 1]) ); // 01.01.14 
console.log( formatDate(new Date(2014, 0, 1)) ); // 01.01.14
