const Users = require('../models/userModel');

const userController = {
    searchUser: async (req, res) => {
        try{
            const users = await Users.find({fullname: {$regex: req.query.fullname}})
                                    .limit(10).select('fullname email avatar');

            res.json({users});
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    getUser: async (req, res) => {
        try{
            const user = await Users.findById(req.params.id).select('-password')
                                .populate('followers followings', '-password');

            if(!user)
                return res.status(400).json({msg: 'User does not exist.'});
            res.json({user});
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    updateUser: async (req, res) => {
        try{
            const { fullname, dob, gender, address, description, avatar, photoCover } = req.body;

            if(!fullname){
                return res.status(400).json({msg: 'Please add your full name.'});
            }

            await Users.findOneAndUpdate({_id: req.user.id}, { fullname, dob, gender, address, description, avatar, photoCover } );

            res.json({msg: 'Update Success!'});
            
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    follow: async (req, res) => {

        try{
            const user = await Users.find({_id: req.params.id, followers: req.user._id});
            if(user.length > 0){
                return res.status(500).json({msg: 'This user is already followed.'});
            }

            const newUser = await Users.findOneAndUpdate({_id: req.params.id}, {
                $push: {followers: req.user._id}
            }, {new: true}).populate('followers followings', '-password'); //*
            
            await Users.findOneAndUpdate({_id: req.user._id}, {
                $push: {followings: req.params.id}
            }, {new: true}); //*

            res.json({newUser});

        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    unfollow: async (req, res) => {
        try{
            const newUser = await Users.findOneAndUpdate({_id: req.params.id}, {
                $pull: {followers: req.user._id}
            }, {new: true}).populate('followers followings', '-password'); //*
            
            await Users.findOneAndUpdate({_id: req.user._id}, {
                $pull: {followings: req.params.id}
            }, {new: true}); //*

            res.json({newUser});

        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    },
    suggestionsUser: async (req, res) => {
        try{
            const newArr = [...req.user.followings, req.user._id];

            const num = req.query.num || 5

            const users = await Users.aggregate([
                {$match: {_id: { $nin: newArr }}},
                {$sample: {size: Number(num)}},
            ]).project('-password');

            return res.json({users});
        } catch(err){
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = userController;