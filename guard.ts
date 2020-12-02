import express from 'express';

export function isLoggedIn(req:express.Request,res:express.Response,next:express.NextFunction){
    if(req.session['user']){
        next();
    }else{
        res.status(401).json({msg:"Unauthorized"})
    }
}