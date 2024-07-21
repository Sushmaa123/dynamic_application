const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const users=require("../Models/user");
const cors=require("cors");
var jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const { validateToken } = require("../MiddleWares/middleware");


router.use(cors());
router.use(bodyparser());
router.post('/api/user/register', body('email').isEmail(), body('password').isLength(min = 8, max = 16),cors(), async (req, res) => {
    
    const { email, password } = req.body;
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(500).json({ message: error.array() })
        }
        const data = await users.findOne({ email: email })
        if (data) {
            return res.status(500).json({
                message: "Email is already registered"
            })
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({ message: err.message })
            }

            const data = await users.create({
                email,
                password: hash,
                mobileNumber:req.body.mobileNumber,
                name:req.body.name,
                place:req.body.place
            })
            res.status(200).json({
                status: "success",
                message: "Registration Successful"
            })
        });


    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }

});


router.post("/api/user/login", async (req, res) => {
    const {email,password}=req.body;
    const userData = await users.findOne({ email: email });
    if (userData != null) {
      var result = await bcrypt.compare(password, userData.password);
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 10) + 60 * 60,
            data: userData._id,
          },
          'harsha'
        );
        res.status(200).json({
          Status: "Successful",
          token: token,
        });
      } else {
        res.status(400).json({
          status: "failed",
          message: "Wrong Password",
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "No user Found",
      });
    }
  });

  /*  to update the password */

  router.post("/api/user/updatePassword", async (req,res)=>{
    try{
        let user=await users.findOne({email:req.body.email});
        if(user!==null){
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
                if (err) {
                    return res.status(400).json({ message: err.message })
                }
    
            await users.updateOne({email:req.body.email},
                    { $set: { password: hash } })
            }
            )
            res.status(200).json({
                status: "success",
                message: "password changed Successful"
            })


        }else {
            res.status(400).json({
              status: "failed",
              message: "Email is not registered",
            });
          }

    }catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })

    }
  });

  router.get("/api/user",validateToken,async (req,res)=>{
    try{
      const data=await users.findOne({_id:req.user});
      res.status(200).json({
        data
      })
    }catch(err){
      res.status(400).json({
        status:"failed",
        message:err.message
      })
    }
    
  });

  router.post("/api/user/update",validateToken, async (req,res)=>{
    try{
      await users.updateOne({_id:req.user},{
        $set:{
          mobileNumber:req.body.mobileNumber,
          name:req.body.name,
          place:req.body.place
        }
      });
      res.status(200).json({
        status:"success",
        message:"profile updated successfully"
      })
    }catch(err){
      res.status(400).json({
        status:"failed",
        message:err.message
      })
    }
  })


module.exports=router;