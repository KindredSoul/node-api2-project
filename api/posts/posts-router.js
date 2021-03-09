// implement your posts router here

const Posts = require('./posts-model')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if(!post){
                res.status(400).json({
                    message: "The post with the specified ID does nt exist"
                })
            }
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

router.post('/', (req, res) => {
    const [title, contents] = req.body
    if(!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }

    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The post with the specified ID does not exist"
            })
        })
})

router.put('/:id', (req, res) => {
    const [title, contents] = req.body
    const idVar = req.params.id
    if(!idVar){
        res.status(404).json({
            message: "The post with the specified ID does not exist" 
        })
    }
    else if(!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    Posts.update(idVar, req.body)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })


})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    if(!id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
    Posts.remove(id)
        .then(() => {
            res.status(200)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The post could not be removed"
            })
        })
})

router.get('/:id/comments', (req, res) => {
    if(!req.params.id){
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
    Posts.findPostComments(req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})

module.exports = router