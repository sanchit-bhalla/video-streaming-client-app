import React from "react";
import flv from "flv.js";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchStream } from "../../actions";

const StreamShow = () => {
  const videoRef = useRef();
  const firstTimeRender = useRef(true);
  const flvPlayer = useRef("");
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (firstTimeRender.current) {
      dispatch(fetchStream(id));
      firstTimeRender.current = false;
    }

    buildPlayer();
  });

  const buildPlayer = () => {
    // If player is build before or if stream is not present , no need to create player
    if (flvPlayer.current || !stream) {
      return;
    }

    flvPlayer.current = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    flvPlayer.current.attachMediaElement(videoRef.current);
    flvPlayer.current.load();
  };

  // useSelector Hook -> Replacement for connect and mapStateToProps
  const stream = useSelector((state) => state?.streams[id]);

  if (!stream) {
    // 1st time when streamShow component renders after user directly opens stream show page; there will be no stream and hence result of useSelector will be undefined. After this useEffect will run and stream will be fetched and hence user will see the required stream
    return <div>Loading...</div>;
  }

  return (
    <div>
      <video
        ref={videoRef}
        src=""
        style={{ width: "100%", height: 400 }}
        controls
      />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

export default StreamShow;
