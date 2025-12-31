import db from '../config/dbConnection.js';
import jwt from 'jsonwebtoken';


export const userRegister = (req, res)=>{

    const {name, email, password, dob, address, phone_no, gender}= req.body;

    const checkquery = "SELECT * FROM users where email = ?"

    db.query(checkquery,[email])

    const query = "INSERT INTO users (`name`, `email`, `password`, `dob`, `address`, `phone_no`, `gender`, created_at) VALUES(?, ?, ?, ?, ?, ?, ?, NOW())" ;

    db.query(query, [name, email, password, dob, address, phone_no, gender], (err, result)=>{
        if(err){
            res.json({
                status:false,
                message:"Something Went Wrong"
            })
        }
        else{
            res.json({
                status:true,
                message:"User Registered"
            })
        }

    });

}




export const userLogin = (req , res)=>{

    const {email , pass} = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, pass], (err, result)=>{

        if(result.length > 0){

            const token = jwt.sign({ id:result[0].id, email:result[0].email}, process.env.JSONTOKEN , { expiresIn:'10h' });

            res.json({
                status:true,
                message:"User Successfully Logged In",
                token:token,
                user:result[0]
            })
        }else{
            res.json({
                status:false,
                message:"Invalid Email / Password"
            })
        }

    })

}