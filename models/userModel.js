const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        default: "2001-08-20",
    },
    avatar:{
        type: String,
        default: 'https://res.cloudinary.com/dndmyqnme/image/upload/v1700150405/my-social-network/image-avatar-default_hle1ez.jpg'
    },
    photoCover: {
        type: String,
        default: 'https://res.cloudinary.com/dndmyqnme/image/upload/v1700150771/my-social-network/image-default-photoCover_hm3ws9.jpg',
    },
    role: {type: String, default: 'user'},
    gender: {type: String, default: 'Male'},
    address: {type: String, default: ''},
    description: {
        type: String, 
        default: '',
        maxlength: 200
    },
    followers: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    followings: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    saved: [{type: mongoose.Types.ObjectId, ref: 'user'}]
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema);