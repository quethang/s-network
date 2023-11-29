const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/userModel');

const authController = {
    register: async(req, res) => {
        try{
            const { fullName, email, password} = req.body;

            let newFullName = fullName.trim();
            let newEmail = email.trim();
            let newPass = password.trim();

            //check ràng buộc dữ liệu
            const findEmail = await Users.findOne({email: newEmail});
            if(findEmail){
                return res.status(400).json({msg: "This email is already exists"});
            }
            
            if(newPass.length < 6){
                return res.status(400).json({msg: "Password must be at least 6 characters."});
            }

            //băm mật khẩu
            const pwHashed = await bcrypt.hash(newPass, 12);

            const newUser = new Users({
                fullname: newFullName,
                email: newEmail,
                password: pwHashed,
            })

            const access_token = createAccessToken({id: newUser._id});
            const refresh_token = createRefreshToken({id: newUser._id});

            //tạo cookie lưu token
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            })

            await newUser.save();

            res.json({
                msg: 'Register success!',
                access_token,
                user: {
                    ...newUser._doc,
                    password: ''
                }
            });

        } catch(e){
            return res.status(500).json({msg: e.message});
        }
    },
    login: async(req, res) => {
        try{
            const {email, password} = req.body;

            //Check email
            const user = await Users.findOne({email}).populate('followers followings', '-password');
            if(!user){
                return res.status(400).json({msg: 'This email does not exists.'});
            }
            
            //Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({msg: 'Password is wrong!'});
            }

            const access_token = createAccessToken({id: user._id});
            const refresh_token = createRefreshToken({id: user._id});

            //tạo cookie lưu refreshtoken phía client
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000
            });
            // trả access token cho client
            res.json({
                msg: 'Login success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            });
        } catch(e){
            return res.status(500).json({msg: e.message});
        }
    },
    logout: async(req, res) => {
        try{
            res.clearCookie('refreshtoken', {path: '/api/refresh_token'});
            return res.json({msg: 'Logged out'});
        } catch(e){
            return res.status(500).json({msg: e.message});
        }
    },
    generateAccessToken: async(req, res) => {
        try{
            const rf_token = req.cookies.refreshtoken;

            if(!rf_token){
                return res.status(400).json({msg: 'Please login.'});
            }

            //check xem refresh token có chứa secretkey giống với secretkey của server-side
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
                if(err){
                    return res.status(400).json({msg: 'Please login.'});
                }
                
                const user = await Users.findById(result.id).select('-password').populate('followers followings', '-password');

                if(!user){
                    return res.status(400).json({msg: 'This does not exist.'});
                }

                const access_token = createAccessToken({id: result.id});

                res.json({
                    access_token,
                    user
                })
            });
            
        } catch(e){
            return res.status(500).json({msg: e.message});
        }
    },
}

function createAccessToken(id){
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

function createRefreshToken(id){
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
}

module.exports = authController;