const posts = new Map();
let nextId = 0;

addPost({ title: "Magico", developer: "Fik.inc", description: "Da best game" });
addPost({ title: "Vilida", developer: "Sion.inc", description: "Da worst game" });


//Prueba a añadir o comentar todos para ver mas posts o el mensaje de que no hay posts

export function addPost(post) {
    let id = nextId++;
    post.id = id.toString();
    posts.set(post.id, post);
    return post;  // añadido para poder redirigir a la página del post
}

export function deletePost(id){
    posts.delete(id);
}

export function getPosts(){
    return [...posts.values()];
}

export function getPost(id){
    return posts.get(id);
}


// export function updatePost(id, updatedPost) {
//     if (posts.has(id)) {
//         // The post exists, so update it
//         updatedPost.id = id;
//         posts.set(id, updatedPost);
//     } else {
//         // The post doesn't exist
//         console.error(`Post with id ${id} not found.`);
//     }
// }