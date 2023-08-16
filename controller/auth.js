
var jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require ("../model/user");
const bcrypt = require("bcrypt");



// const signup = (async (req, res, next) => {
//     console.log(req.body);
// try{
// let {value, error} = schema.validateAsync(req.body);
// if(error){
//     res.status(400).send(error);
// }
// }catch(err){
//     next(err);
// }
// let {value, error} = await schema.validateAsync(req.body,{abortEarly:false,stripUnknown : true});
//     if(error){
//         let errors = error.details.map(validation_error =>{
//             return{
//                 params: validation_error.context.key,
//                 message: validation_error.message
//             }
//         })
//         return res.status(400).status({
//             msg:"bad request",
//             errors : errors
//         })
//     }
// try{

//     let {value, error} = await schema.validateAsync(req.body,{abortEarly:false,stripUnknown : true});
//     // if(error){
//     //     let errors = error.details.map(ValidationError =>{
//     //         return{
//     //             param: ValidationError.context.key,
//     //             message: ValidationError .message
//     //         }
//     //     })
//     //     return res.status(400).json({
//     //         msg:"bad request",
//     //         errors : errors
//     //     })
//     // }



// }catch(err){
//     res.send(err);
// }
    // return;

    // try{
    //    let hash_pw = await  bcrypt.hash(req.body.password, 10, function(err, hash) {
    //         // Store hash in your password DB.
    //         console.log(hash);
    //     });
    //     //password chai jailey pani one way encryption hunxa...means password can be encrypted but canot be decrypted
        
    //     let user = await User.create({...req.body,password : hash_pw})
    //     res.send(user);
    // }catch(err){
    //     next(err);
    // }
// })
    const signup = async (req, res, next) => {
        try {
            const hash_pw = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({ //database maa naya user create gareko to store the hashed password(important ho yo kura)
                ...req.body,
                password: hash_pw
            });
            res.send(user);
        } catch (err) {
            next(err);
        }
    };
    
   



const login = (async(req, res) => {
    // let{value,error} = loginSchema.validate(req.body,{ abortEarly : false, stripUnknown: true})
//    if (error){
//     let errors = error.details.map(validation_error => {
//         return{
//             params: validation_error.context.key,
//             message: validation_error.message
//         }
//     })
//     return res.status(400).send({
//         msg:"Bad request",
//         errors
//     })
//    }
   

/*valid email password ho ki haina check garney*/
   let user = await User.findOne({email:req.body.email})
   console.log(user);
   
   if(user){

    

    let status = await bcrypt.compare(req.body.password,user.password );
    if(status){
        
        //hiding password:
        let obj = {...user.toObject()}
        var token = jwt.sign(obj, process.env.JWT_SECRET);
        delete obj.password


        return res.send({data:obj, token})
    }
//jwt vaneko chai jason web token ho, jwt le chai purai user ko information lai as a abject token banayera pass garauxa
//shhhhh vaneko secret key ho,,yedi token leak vayo vaney log out garna milxa..like log out from all device of facebook


}
   
  
   return res.status(401).send({msg:"unauthenticated"})
   
   
  
})

module.exports = {
    signup,
    login
}