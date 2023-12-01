import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import { postDataAPI, getDataAPI, patchDataAPI } from "../../utils/fetchData";
// import { createNotify } from "./notifyAction";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
};

export const createPost = ({ content, images, auth, socket }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (images.length > 0) media = await imageUpload(images);

      const res = await postDataAPI(
        "posts",
        { content, images: media },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      // Notify
      //   const msg = {
      //     id: res.data.newPost._id,
      //     text: "added a new post.",
      //     recipients: res.data.newPost.user.followers,
      //     url: `/post/${res.data.newPost._id}`,
      //     content,
      //     image: media[0].url,
      //   };

      //   dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
export function getPosts(token) {
  return async (dispatch) => {
    try {
      dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
      const res = await getDataAPI('posts', token);

      dispatch({
        type: POST_TYPES.GET_POSTS,
        payload: {...res.data, page: 2}
      })

      dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  }
};

export function updatePost({ content, images, auth, status }) {
  return async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter(image => !image.url);
    const imgOldUrl = images.filter(image => image.url);

    if (status.content === content && imgNewUrl.length === 0 && imgOldUrl.length === status.images.length) {
      return;
    }

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      if (imgNewUrl.length > 0) {
        media = await imageUpload(imgNewUrl);
      }
      const res = await patchDataAPI(`post/${status._id}`, { content, images: [...imgOldUrl, ...media] }, auth.token);

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  }
}

export function likePost({ post, auth }) {
  return async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token)
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  }
}

export function unlikePost({ post, auth }) {
  return async (dispatch) => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id) };
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  }
}

export function getPost({ detailPost, id, auth }) {
  return async (dispatch) => {

    if (detailPost.every(post => post._id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token)
        dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg }
        })
      }
    }

  }
}



