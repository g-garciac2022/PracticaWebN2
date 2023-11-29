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
    return [...posts.values()]; //devuelve un array con los valores del mapa
}

export function getPost(id){
    return posts.get(id);
}


export function updatePost(id, newPostData) {
    
    let post = posts.get(id); //The posts.values() method returns a new Iterator object that contains the values for each element in the posts Map in insertion order
    if (!post) {
        return null;
    }
    let updatedPost = { ...post, ...newPostData }; //copia el post y le añade los nuevos datos 
    posts.set(id, updatedPost);
    return updatedPost;
}