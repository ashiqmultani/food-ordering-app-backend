import { NextFunction ,Request, Response } from 'express'
import {body, validationResult} from 'express-validator'

const handleValidationError = (req:Request , res:Response ,next : NextFunction)=>{
  const error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(400).json({error : error.array()})
  }
  next();
}


export const validateMyUserRequest = [
    body('name').isString().notEmpty().withMessage("Name must be a String"),
    body('addressLine1').isString().notEmpty().withMessage("addressLine1 must be a String"),
    body('city').isString().notEmpty().withMessage("city must be a String"),
    body('country').isString().notEmpty().withMessage("country must be a String"),
    handleValidationError,

]