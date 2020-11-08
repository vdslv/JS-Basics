// -------------- Use fetch to work with fake json api server (optional) --------------------
fetchList = () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(comments => comments.json())
        .then(data => data[Math.round(Math.random() * 500)])
        .then(comment => getPost(comment.postId))
        .then(post => getUser(post))
        .then( ({ post, userData }) => {
            deletePost(post),
            updateUser(userData)
        })
}

fetchList();

function getPost(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(post => post.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

function getUser(post) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then(user => user.json())
        .then(userData => {
            console.log(userData);
            return { post, userData };
        });
}

function deletePost(post) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, { method: 'DELETE' })
        .then(user => user.json())
}

function updateUser(user) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${user.id}`,
        { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...user, username: 'PETRO'})
        })
        .then(user => user.json())
        .then(data => {
            console.log(data);
            return data;
        });
}