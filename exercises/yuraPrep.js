const users = {
    user1: ["group1", "group2", "group17"],
    user22: ["group2"],
    user73: ["group1", "group15"],
}

const groups = {
    group1: ["user1", "user73"],
    group2: ["user1", "user22"],
    group15: ["user73"],
    group17: ["user1"],
}

function reverseObject(obj) {
    return Object.entries(obj).reduce((acc,[user, groups]) => {
        groups.forEach(val => {
            if(!acc[val]) {
                acc[val] = [];
            }
            if(acc[val] && !acc[val].includes(user)) {
                acc[val].push(user);
            }})
            return acc;
        }, {})
    // let entries = Object.entries(obj);
    // entries.forEach(([user, groups]) => {
    //     groups.forEach(val => {
    //         if(!result[val]) {
    //             result[val] = [];
    //         }
    //         if(result[val] && !result[val].includes(user)) {
    //             result[val].push(user);
    //         }
    //     })
    // })

}

console.log(reverseObject(users));