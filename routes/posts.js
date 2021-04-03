const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

//gets all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
        // res.render('../views/index.ejs',{posts: posts});
    } catch(err) {
        res.json({message: err});
    }
});

//submits a post
// router.post('/', async (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });
//     // console.log(req.body);
//     try{
//         const savedPost = await post.save();
//         // res.json(savedPost);
//         res.redirect('/posts');

//     }catch(err) {
//         res.json({message: err})
//     }
// })

//submit post thru form
// router.get('/create', (req, res) => {
//     try{
//         res.render('../views/create.ejs');
//     } catch(err) {
//         res.json({message: err});
//     }
// })

// //get back a specific post
router.get('/:postId', async (req, res) => {
    try{
        const postID = await Post.findById(req.params.postId);
        res.json(postID);
    } catch(err) {
        res.json({message: err})
    }
    
})

// //delete post
// router.delete('/:postId', async (req, res) => {
//     try{
//         const removedPost = await Post.remove({_id: req.params.postId});
//         res.json(removedPost);
//     } catch(err){
//         res.json({message: err})
//     }
// })

// //update a post
// router.patch('/:postId', async (req, res) => {
//     try{
//         const updatedPost = await Post.updateOne(
//             {_id: req.params.postId}, 
//             {$set: {title: req.body.title}
//         });
//         res.json(updatedPost);
//     } catch(err){
//         res.json({message: err});
//     }
// })


module.exports = router;