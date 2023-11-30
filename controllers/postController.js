const Posts = require("../models/postModel");

const postController = {
  createPost: async (req, res) => {
    try {
      const { content, images } = req.body;

      if (content === '' && images.length === 0) {
        return res.status(400).json({ msg: 'Please enter your content or image' });
      }

      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      });

      await newPost.save();

      res.json({ msg: 'Created post', newPost });
      // res.json({
      //   msg: "Created Post!",
      //   newPost: {
      //     ...newPost._doc,
      //     user: req.user,
      //   },
      // });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //
  getPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ user: [...req.user.followings, req.user._id] })
        .sort('-createAt')
        .populate('user likes', 'avatar fullname email')
        .populate({ path: 'comments', populate: { path: 'user likes', select: '-password' } });
      //đoạn này có nghĩa là tham chiếu đến model Comment và Comment tham chiếu đến bảng 
      //user và khi tham chiếu đến user thì loại bỏ password

      res.json({
        msg: 'Success!',
        result: posts.length,
        posts
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { content, images } = req.body;

      const post = await Posts.findOneAndUpdate({ _id: req.params.id }, { content, images })
        .populate('user likes', 'avatar username fullname')
        .populate({ path: 'comments', populate: { path: 'user likes', select: '-password' } });
        

      res.json({ msg: 'Update success', newPost: { ...post._doc, content, images } })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  likePost: async (req, res) => {
    try {
      const post = await Posts.find({ _id: req.params.id, likes: req.user._id });

      if (post.length > 0) {
        return res.status(400).json({ msg: 'Liked this post' });
      }

      await Posts.findOneAndUpdate({ _id: req.params.id }, { $push: { likes: req.user._id } }, { new: true });

      res.json({ msg: 'Liked post!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unlikePost: async (req, res) => {
    try {
      await Posts.findOneAndUpdate({ _id: req.params.id }, { $pull: { likes: req.user._id } }, { new: true });

      res.json({ msg: 'Unliked post!' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const posts = await Posts.find({ user: req.params.id }).sort("-createdAt")
      res.json({ posts, result: posts.length })

    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getPost: async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        .populate("user likes", "avatar username fullname followers")
        .populate({
            path: "comments",
            populate: {
                path: "user likes",
                select: "-password"
            }
        })

        if(!post) return res.status(400).json({msg: 'This post does not exist.'})

        res.json({
            post
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
};

module.exports = postController;
