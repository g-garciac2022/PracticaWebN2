import express from 'express';
import * as boardService from './zarmaService.js';

const router = express.Router();

// Servir archivos estáticos desde la carpeta 'public' para que funcione el css
router.use(express.static('public'));

router.get('/', (req, res) => {

    res.render('index', { 
        posts: boardService.getPosts() 
        //son necesarios estos get post??
    });
});

router.get('/pagina-detalle', (req, res) => {

    res.render('pagina-detalle', { 
        posts: boardService.getPosts() 
        //son necesarios estos get post??
    });
});

router.get('/add-elemento', (req, res) => {

    res.render('add-elemento', { 
        posts: boardService.getPosts() 
        //son necesarios estos get post??
        
    });

});

router.get('/post/new', (req, res) => {
    res.render('add-elemento', { post: {} });
});

router.post('/add-elemento', (req, res, next) => {
    let { title, developer, description } = req.body;
    if (!title || !developer || !description) {
        next(new Error('Missing form fields'));
    } else {
        let newPost = boardService.addPost({ title, developer, description });
        res.redirect(`/post/${newPost.id}`);
    }
});

router.post('/post/new', (req, res) => {
    let { title, developer, description } = req.body;
     {
        let post = boardService.addPost({ title, developer, description });
        res.redirect(`/post/${post.id}`);
    }
});

router.get('/post/:id', (req, res,next) => {  //en verdad, si no existe el post debe llamar a nustra funcion de errores y no enviarlo directamente

    let post = boardService.getPost(req.params.id); //la id se puede ver en el navegador
    if (!post) { //si no existe el post se muestra la pagina de error
        next(new Error('Post no encontrado')); // replace '/error' with your actual error page route
    } else {
    res.render('pagina-detalle', { post }); //carga la pagina detalle del post que recibe por parametro
}});

router.get('/post/delete/:id', (req, res) => { //aun no implementado

    boardService.deletePost(req.params.id);

    res.redirect('/');
    
});

// router.use((req, res,) => {
//     res.status(404).render('error', { message: 'Page not found' }); //solo para 404, mejorar para que sea para todos
// });

router.get('/post/edit/:id', (req, res) => {
    let post = boardService.getPost(req.params.id);
        res.render('add-elemento', { post });
});

router.post('/post/edit/:id', (req, res) => {
    let { title, developer, description } = req.body;


        let post = boardService.updatePost(req.params.id, { title, developer, description });
        console.log(post);
            res.redirect(`/post/${post.id}`);
            
    }
);
router.get('/error-test', (req, res, next) => {
    next(new Error('This is a test error'));
});

// router.use((req, res, next) => {
//     let err = new Error('Página no encontrada');
//     err.status = 404;
//     next(err);
// });

// router.use((err, req, res, next) => {
//     console.error(err.stack);  // Log the stack trace of the error
//     res.status(err.status || 500).render('error', { title: 'Error', message: err.message });  // Respond with the error status and render an error page with the error message
// });

//Este de abajo debería ser para editar, pero aplicado a subelementos NO ELEMENTOS

// router.put('/post/:id', (req, res) => {
//     let id = req.params.id;
//     let updatedPost = req.body;

//     boardService.updatePost(id, updatedPost);

//     res.send({ message: 'Post updated successfully' });
// });
export default router;



