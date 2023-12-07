import { GLOBALTYPES, EditData, DeleteData } from "./globalTypes";
import { POST_TYPES } from "./postAction";
import { postDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData';
import { createNotify, removeNotify } from '../actions/notifyAction';

export function createComment({ post, newComment, auth, socket }) {
    return async (dispatch) => {
        //update post
        //để có thể thấy được sự thay đổi của cập nhật comment nên dispatch update 2 lần
        //lần đầu là chưa có id, lần sau mới có
        const newPost = { ...post, comments: [...post.comments, newComment] }
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

        try {
            //create comment
            const data = { ...newComment, postId: post._id, postUserId: post.user._id };

            const res = await postDataAPI('comment', data, auth.token);

            const newData = { ...res.data.newComment, user: auth.user };

            const newPost = { ...post, comments: [...post.comments, newData] };

            dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

            socket.emit('createComment', newPost);
            
            //Thông báo
            const msg = {
                id: res.data.newComment._id,
                text: newComment.reply ? 'mentioned you in comment.' : 'has commented on your post.',
                recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
                url: `/post/${post._id}`
            }

            dispatch(createNotify({msg, auth, socket}))

        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        }
    }
}

export function updateComment({ comment, post, content, auth }) {
    return async (dispatch) => {
        const newComments = EditData(post.comments, comment._id, { ...comment, content });

        const newPost = { ...post, comments: newComments };

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
        try {
            patchDataAPI(`comment/${comment._id}`, { content }, auth.token);

        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        }
    }
}

export function likeComment({ comment, post, auth }) {
    return async (dispatch) => {
        const newComment = { ...comment, likes: [...comment.likes, auth.user] };

        const newComments = EditData(post.comments, comment._id, newComment);

        const newPost = { ...post, comments: newComments };

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        try {
            await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        }
    }
}

export function unlikeComment({ comment, post, auth }) {
    return async (dispatch) => {
        const newComment = { ...comment, likes: DeleteData(comment.likes, auth.user._id) };

        const newComments = EditData(post.comments, comment._id, newComment);

        const newPost = { ...post, comments: newComments };

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
        try {
            await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        }
    }
}

export const deleteComment = ({ post, comment, auth, socket }) => async (dispatch) => {
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment]
    console.log(deleteArr)

    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    socket.emit('deleteComment', newPost)
    try {
        deleteArr.forEach(item => {
            deleteDataAPI(`comment/${item._id}`, auth.token);

            const msg = {
                id: item._id,
                text: comment.reply ? 'mentioned you in a comment.' : 'has commented on your post.',
                recipients: comment.reply ? [comment.tag._id] : [post.user._id],
                url: `/post/${post._id}`,
            }
    
            dispatch(removeNotify({msg, auth, socket}));
        })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }

}