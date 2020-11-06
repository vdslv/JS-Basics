// --------------------------  Array to List ------------------
const arrayToList = (arr) =>
    arr.length ? { value: arr[0], rest: arrayToList(arr.slice(1))} : null;

console.log(arrayToList([10, 20])); // → {value: 10, rest: {value: 20, rest: null}}

const listToArray = (linkedList) =>
    linkedList ? [linkedList.value, ...listToArray(linkedList.rest)]: [];

console.log(listToArray(arrayToList([10, 20, 30]))); // → [10, 20, 30]

// ------------------  Keys and values to list  -------------------
const getKeyValuePairs = (obj) => Object.entries(obj);

console.log(getKeyValuePairs({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"}));
// → [["red","#FF0000"],["green","#00FF00"],["white","#FFFFFF"]]

// ------------------  Invert keys and values --------------------------
const invertKeyValue = (obj) =>
    Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]))

console.log(invertKeyValue({red: "#FF0000", green: "#00FF00", white: "#FFFFFF"}));
// → {"#FF0000":"red","#00FF00":"green","#FFFFFF":"white"}

// -------------------  Get all methods from an object  -----------------
const getAllMethods = (obj) => Object.getOwnPropertyNames(obj).filter(property => typeof obj[property] === 'function')

console.log(getAllMethods(Math));

// --------------------  Clock  -----------------------------
function Clock() {
    let currentTime;
    this.run = function () {
        return currentTime = setInterval(function () {
            console.log(new Date().toLocaleTimeString().slice(0,-3))
        },1000)
    }

    this.stop = function () {
        clearInterval(currentTime);
    }
}

const clock = new Clock();
clock.run();
clock.stop();

// ----------------------  Groups ---------------------- 
class Group {
    group;

    static from(iterableObject) {
        // return new Set(iterableObject); // also works as expected
        const newInstanceOfGroup = new Group();
        newInstanceOfGroup.group = iterableObject;
        return newInstanceOfGroup;
    }

    delete(value) {
        const index = this.group.indexOf(value);
        index >= 0 ? this.group.splice(index, 1) : null;
    }

    has(value) {
        return this.group.includes(value) ? true : false
    }

    add(value) {
        if(!this.group.includes(value)) this.group.push(value);
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10)); // → true
console.log(group.has(30)); // → false
group.add(10);
group.delete(10);
console.log(group.has(10)); // → false
