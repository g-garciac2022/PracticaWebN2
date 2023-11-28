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

router.get('/add-elemento', (req, res) => { //funciona correctamente

    res.render('add-elemento', { 
        posts: boardService.getPosts() 
    });
});


router.post('/post/new', (req, res) => {
    let { title, developer, description } = req.body; //aumentar a fecha, url de imagen y chechkbox
    let post = boardService.addPost({ title, developer, description });
    res.redirect(`/post/${post.id}`);  
    //debe de ser redirect obligatoriamente, si no intentara cargar una pagina web fisica
});

router.get('/post/:id', (req, res) => {  //en verdad, si no existe el post debe llamar a nustra funcion de errores y no enviarlo directamente

    let post = boardService.getPost(req.params.id); //la id se puede ver en el navegador
    if (!post) { //si no existe el post se muestra la pagina de error
        res.redirect('/error');  // replace '/error' with your actual error page route
    } else {
    res.render('pagina-detalle', { post }); //carga la pagina detalle del post que recibe por parametro
}});

router.get('/post/:id/delete', (req, res) => { //aun no implementado

    boardService.deletePost(req.params.id);

    res.render('deleted_post');
});

router.use((req, res,) => {
    res.status(404).render('error', { message: 'Page not found' }); //solo para 404, mejorar para que sea para todos
});


//Este de abajo debería ser para editar, pero aplicado a subelementos NO ELEMENTOS

// router.put('/post/:id', (req, res) => {
//     let id = req.params.id;
//     let updatedPost = req.body;

//     boardService.updatePost(id, updatedPost);

//     res.send({ message: 'Post updated successfully' });
// });
export default router;



