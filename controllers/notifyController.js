const Notifies = require('../models/notifyModel')


const notifyController = {
    createNotify: async (req, res) => {
        try {
            const { id, recipients, url, text } = req.body;

            if(recipients.includes(req.user._id.toString())){
                return;
            }
            let notifies = [];
            let a = {};
            for(recipient of recipients){
                a = await Notifies.create({ id, recipient, url, text, user: req.user._id });
                notifies.push(a)
            }
            // const notify = new Notifies({
            //     id, recipients, url, text, user: req.user._id
            // })

            // await notify.save();
            return res.json({notifies});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    removeNotify: async (req, res) => {
        try {
            // const notify = await Notifies.deleteMany({
            //     id: req.params.id, url: req.query.url
            // })
            let notify = {};
            if(req.query.url.includes(req.params.id)){
                notify = await Notifies.deleteMany({
                    url: req.query.url
                })
            } else {
                notify = await Notifies.deleteMany({
                    id: req.params.id
                })
            }
            
            return res.json({notify})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getNotifies: async(req, res) => {
        try {
            const notifies = await Notifies.find({recipient: req.user._id})
                            .sort('-createdAt').populate('user', 'avatar fullname')
            
            return res.json({notifies});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    isReadNotify: async(req, res) => {
        try {
            const notifies = await Notifies.findOneAndUpdate({_id: req.params.id}, {isRead: true});

            return res.json({notifies});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    deleteAllNotifies: async(req, res) => {
        try {
            // const notifies = await Notifies.deleteMany({recipients: req.user._id});
            const notifies = await Notifies.deleteMany({recipient: req.user._id});
            return res.json({notifies});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
}


module.exports = notifyController