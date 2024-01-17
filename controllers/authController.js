const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/userModel');

const mailer = require('../mailer')


const authController = {
    register: async (req, res) => {
        try {
            const { fullName, email, password } = req.body;

            let newFullName = fullName.trim();
            let newEmail = email.trim();
            let newPass = password.trim();

            //check ràng buộc dữ liệu
            const findEmail = await Users.findOne({ email: newEmail });
            if (findEmail) {
                return res.status(400).json({ msg: "This email is already exists" });
            }

            if (newPass.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters." });
            }

            //băm mật khẩu
            const pwHashed = await bcrypt.hash(newPass, 12);

            const newUser = new Users({
                fullname: newFullName,
                email: newEmail,
                password: pwHashed,
            })

            try {
                const user = await Users.create(newUser);
                const hashedEmail = await bcrypt.hash(user.email, parseInt(process.env.BCRYPT_SALT_ROUND));
                // console.log(`${process.env.APP_URL}/api/verify?email=${user.email}&token=${hashedEmail}`);
                mailer.sendMail(user.email, "Verify Email",
                    `<div style="max-width: 700px; margin: 0 auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; text-align: center;">
                    <h2 style="text-transform: uppercase; color: teal;">Welcome to the S-Network.</h2>
                    <p>Congratulations! You're almost set to start using S-Network. Just click the button below to validate your email address.</p>
                    <div style="text-align: center;">
                      <a href="${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}" style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify email now</a>
                    </div>
                    <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                    <div>${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}</div>
                  </div>`
                );

            } catch (error) {
                console.error(error);
            }

            res.json({
                msg: 'Register success! Please verify your Email',
            });

        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            //Check email
            const user = await Users.findOne({ email }).populate('followers followings', '-password');
            if (!user) {
                return res.status(400).json({ msg: 'This email does not exists.' });
            }

            //Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Password is wrong!' });
            }

            //check verify
            if (!user.verify) {
                return res.status(400).json({ msg: 'Email does not verify!' });
            }

            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            //tạo cookie lưu refreshtoken phía client
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000
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
        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
            return res.json({ msg: 'Logged out' });
        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;

            if (!rf_token) {
                return res.status(400).json({ msg: 'Please login.' });
            }

            //check xem refresh token có chứa secretkey giống với secretkey của server-side
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
                if (err) {
                    return res.status(400).json({ msg: 'Please login.' });
                }

                const user = await Users.findById(result.id).select('-password').populate('followers followings', '-password');

                if (!user) {
                    return res.status(400).json({ msg: 'This does not exist.' });
                }

                const access_token = createAccessToken({ id: result.id });

                res.json({
                    access_token,
                    user
                })
            });

        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    },
    verify: async (req, res) => {
        try {
            bcrypt.compare(req.body.email, req.body.token, async (err, result) => {
                // console.log(req.body.email, req.body.token)
                if (result == true) {
                    try {
                        const updatedUser = await Users.findOneAndUpdate(
                            { email: req.body.email },
                            { verify: true },
                            { new: true }
                        );
                        res.json({ msg: "verified Email" })
                    } catch (e) {
                        return res.status(500).json({ msg: e.message });
                    }
                } else {
                    res.redirect('/notfound');
                }
            });
        } catch (e) {
            return res.status(500).json({ msg: e.message });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            // const access_token = createAccessToken({ id: user._id })
            const access_token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            const url = `${process.env.APP_URL}/reset/${access_token}`

            mailer.sendMail(user.email, "Confirm change password",
                `<div style="max-width: 700px; margin: 0 auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; text-align: center;">
            <h2 style="text-transform: uppercase; color: teal;">Welcome to the S-Network.</h2>
            <p>Please click on the link below to continue changing your password!</p>
            <div style="text-align: center;">
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Change password now</a>
            </div>
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            <div>${url}</div>
          </div>`
            );
            res.json({ msg: "Re-send the password, please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body
            const token = req.headers.authorization;

            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const userId = decodedToken.id;

            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({ _id: userId }, {
                password: passwordHash
            })

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

function createAccessToken(id) {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

function createRefreshToken(id) {
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

module.exports = authController;