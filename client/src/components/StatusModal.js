import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";

const StatusModal = () => {
    const auth = useSelector((state) => state.auth);
    const status = useSelector((state) => state.status);
    const socket = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [showListReactions, setShowListReactions] = useState(false);
    const reactions = [
        '🙂', '😀', '😄', '😆', '😅', '😂', '🤣', '😊', '😌',
        '😉', '😏', '😍', '😘', '😗', '😙', '😚', '🤗', '😳',
        '🙃', '😇', '😛', '😝', '😜', '😋', '🤤', '🤓', '😎',
        '🤑', '😒', '🙁', '☹️', '😞', '😔', '😖', '😓', '😢',
        '😢', '😭', '😟', '😣', '😩', '😫', '😕', '🤔', '🙄',
        '😤', '😶', '🤐', '😐', '😑', '😯', '😲', '😧', '😨',
        '😰', '😱', '😪', '😴', '😬', '🤥', '🤧', '🤒', '😷',
        '🤕', '😵', '😈', '😠', '😡', '🤢', '🤠', '🤡', '👿',
        '👹', '👺', '👻', '💀', '👽', '👾', '🤖', '💩', '🎃'
    ];
    // const [stream, setStream] = useState(false);

    // const videoRef = useRef(null);
    // const refCanvas = useRef(null);
    // const [tracks, setTracks] = useState("");

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content);
            setImages(status.images);
        }
    }, [status]);

    const handleChangeImages = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newImages = [];

        files.forEach((file) => {
            if (!file) return (err = "File does not exist.");

            if (file.size > 1024 * 1024 * 5) {
                return (err = "The image/video largest is 5mb.");
            }
            // if (
            //     file.type !== "image/jpeg" &&
            //     file.type !== "image/jpg" &&
            //     file.type !== "image/png" &&
            //     file.type != ""
            // ) {
            //     return (err = "Error image format.");
            // }

            return newImages.push(file);
        });

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setImages([...images, ...newImages]);
    };

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };
    // const handleStream = () => {
    //     setStream(true);
    //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //         navigator.mediaDevices
    //             .getUserMedia({ video: true })
    //             .then((mediaStream) => {
    //                 videoRef.current.srcObject = mediaStream;
    //                 videoRef.current.play();

    //                 const track = mediaStream.getTracks();
    //                 setTracks(track[0]);
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // };

    // const handleCapture = () => {
    //     const width = videoRef.current.clientWidth;
    //     const height = videoRef.current.clientHeight;

    //     refCanvas.current.setAttribute("width", width);
    //     refCanvas.current.setAttribute("height", height);

    //     const ctx = refCanvas.current.getContext("2d");
    //     ctx.drawImage(videoRef.current, 0, 0, width, height);
    //     let URL = refCanvas.current.toDataURL();
    //     setImages([...images, { camera: URL }]);
    // };

    // const handleStopStream = () => {
    //     tracks.stop();
    //     setStream(false);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0) {
            return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your photo." } })
        }
        if (status.onEdit) {
            dispatch(updatePost({ content, images, auth, status }));
        } else {
            dispatch(createPost({ content, images, auth, socket }));
        }

        setContent("");
        setImages([]);
        // if (tracks) tracks.stop();
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };

    function imageShow(src) {
        return (
            <img src={src} className="img" alt="thumbnail" />
        )
    }
    function videoShow(src) {
        return (
            <video controls src={src} className="img" alt="thumbnail" />
        )
    }

    function handleShowListReactions() {
        setShowListReactions(!showListReactions);
    }
    function handleAddIcon(icon){
        setContent(content + icon);
    }

    return (
        <div className="create-post-wrapper">
            <form className="create-post" onSubmit={handleSubmit}>
                <div className="header-create-post">
                    <h5 className="title-create-post">Create post</h5>
                    <div
                        className="icon-wrapper"
                        onClick={() =>
                            dispatch({ type: GLOBALTYPES.STATUS, payload: false })
                        }
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="icon r-1cvl2hr r-4qtqp9 r-yyyyoo r-1hjwoze r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-12ym1je"
                        >
                            <g>
                                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="body-create-post">
                    <div className="input-text">
                        <textarea
                            name="content"
                            placeholder={`What’s on your mind, ${auth.user.fullname}`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            id="content-text"
                        />
                        <div className="list-image-wrapper">
                            {images.map((image, index) => (
                                <div key={index} className="image-wrapper">
                                    {/* <img
                                        src={
                                            image.camera
                                                ? image.camera
                                                : image.url
                                                    ? image.url
                                                    : URL.createObjectURL(image)
                                        }
                                        className="img"
                                        alt="animage"
                                    /> */}
                                    {
                                        image.url
                                            ? <>
                                                {
                                                    image.url.match(/video/i)
                                                        ? videoShow(image.url)
                                                        : imageShow(image.url)
                                                }
                                            </>
                                            : <>
                                                {
                                                    image.type.match(/video/i)
                                                        ? videoShow(URL.createObjectURL(image))
                                                        : imageShow(URL.createObjectURL(image))
                                                }
                                            </>
                                    }
                                    <div
                                        className="icon-wrapper"
                                        onClick={() => deleteImages(index)}
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* {stream && (
                            <div className="stream">
                                <video autoPlay muted ref={videoRef} />
                                <canvas ref={refCanvas} />
                                <div className="icon-wrapper">
                                    <i
                                        className="fa-solid fa-pause"
                                        onClick={handleStopStream}
                                    ></i>
                                </div>
                            </div>
                        )} */}
                    </div>
                    <div className="action-bar-wrapper">
                        {/* <label
                            className="icon-wrapper icon-camera"
                            onClick={stream ? handleCapture : handleStream}
                        >
                            <i className="fa-solid fa-camera"></i>
                        </label> */}
                        <div className="action-bar">
                            <label className="icon-wrapper" onClick={handleShowListReactions}>
                                <i className="far fa-smile icon" />
                                <ul className={`list-reactions ${showListReactions && 'show'}`}>
                                    {
                                        reactions.map((icon, index) => (
                                            <li key={index} onClick={() => handleAddIcon(icon)}>
                                                {icon}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </label>
                            <label className="icon-wrapper" htmlFor="file">
                                <i className="fa-solid fa-image icon"></i>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleChangeImages}
                                />
                            </label>
                        </div>
                        <div className="button-submit-wrapper">
                            <button type="submit" className="button">Post</button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default StatusModal;
