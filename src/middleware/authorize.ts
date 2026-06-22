import { Post } from "#models"
import {type RequestHandler } from "express"

const authorize = (...allowedRoles: string[]): RequestHandler => {
    return async (req, res, next) => {
        const {
            params: {id},
            user
        } = req
        //Call next with an error if no user property is found on the request object with an early return (throwing the error would also work)        
        if (!user) {return next(new Error("Unauthorized", {cause:{status:401}}))}
        //If the user's roles include admin, they are allowed to do everything, so call next() right away
        if (user?.roles.includes("admin")){return next()}
        // If the allowed roles include self, we need to query the database for the post, and compare it to the user's id
        if (allowedRoles.includes("self")){
            const post = await Post.findById(id)
            if (!post) {return next(new Error("Post not found", {cause:{status:404}}))}
            // Call next() with an error and an early return if they don't match
            if(post.author.toString() !== user.id?.toString()) {return next(new Error("Forbidden", {cause:{status:403}}))}
        }
        //Call next() because all checks have been passed
        next()
        //Since user is the baseline role that all authenticated user's have, we don't need to do any additional checks for the user role.
    }
}

export default authorize