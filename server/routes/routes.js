const express = require('express');
const con = require("../config/db")
const bcrypt = require('bcrypt')
const routes = express.Router()

const saltRound = 10;
const cur_date = new Date();


routes.post("/register", async(req, res) =>{
    const user_data = req.body;
    const sql =`
    INSERT INTO user_account(user_first_name, user_last_name, user_email,
            user_password, user_reg_date) VALUES(?,?,?,?,?)
    `
    const harshPWD = await bcrypt.hash(user_data.password, saltRound);
    con.query(sql, 
        [user_data.firstName, user_data.lastName, user_data.email, harshPWD, cur_date],
        (err, result) =>{
            if(err){
                res.json(err)
            }
            else{
                res.json({success:true})
            }
        }) 
})

routes.post('/login', (req, res) =>{
    const {email, password}= req.body;
    let sql = `SELECT * FROM user_account WHERE user_email =?`;
    con.query(sql, [email], (err, results) =>{
        if(err){
            res.json(err)
        }
        else
        {
            if(results.length < 1){
                res.json({success:false, msg:"Invalid Email/Password"})
            }
            else{
                bcrypt.compare(password, results[0].user_password).then(match =>{
                    if(match){
                        res.json({success:true, msg:{
                            user_id: results[0].id,
                            firstName: results[0].user_first_name,
                            lasttName: results[0].user_last_name,
                            email: results[0].user_email,
                            loggedIn: true
                        }})
                    }
                    else{
                        res.json({success:false, msg:"Invalid Email/Password"})
                    }

                })
                
            }
        }

    })
});

routes.post("/new-meeting", (req, res) =>{
    const { meetingTitle, user_id } = req.body;
    const meetingSlug = meetingTitle.replace(/[^A-Z0-9]+/ig, "_")
    let sql = `INSERT INTO meeting(meeting_title, meeting_slug, created_by, date_created) VALUES(?,?,?,?)`;
    con.query(sql, [meetingTitle, meetingSlug, user_id, cur_date], (err, result) =>{
        if(err){
            res.json(err)
        }
        else{
            res.json({success:true, msg:"New Meeting Added!"})
        }
    })
})
routes.get("/get-meetings", (req, res) =>{
    
    let sql = `SELECT * FROM meeting`;
    con.query(sql, (err, result) =>{
        if(err){
            res.json(err)
        }
        else{
            if(result.length < 1){
                res.json({success:false, msg:"No Meeting Added has been added!"})
            }
            else{
                res.json({success:true, meetings:result})
            }
        }
    })
})
routes.get("/verify-meeting/:roomId", (req, res) =>{
    room_id = req.params.roomId
    //console.log(room_id)
    let sql = `SELECT * FROM meeting WHERE meeting_slug = ?`;
    con.query(sql, [room_id], (err, result) =>{
        if(err){
            res.json(err)
        }
        else{
            if(result.length < 1){
                res.json({success:false})
            }
            else{
                res.json({success:true})
            }
        }
    })
})
module.exports = routes;