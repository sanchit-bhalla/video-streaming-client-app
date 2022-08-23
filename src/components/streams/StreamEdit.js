import React from "react";
import { useEffect } from "react";
import { fetchStream, editStream } from "../../actions";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  let { id } = useParams();

  let isLoggedIn = false;
  let isUserAuthorized = false;

  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(editStream(id, formValues));
  };

  useEffect(() => {
    dispatch(fetchStream(id));
  }, []);

  // useSelector Hook -> Replacement for connect and mapStateToProps
  const streamToEdit = useSelector((state) => {
    let stream = "";
    if (state.auth.isSignedIn) {
      isLoggedIn = true;
      if (state.auth.userId == state.streams?.[id]?.userId) {
        isUserAuthorized = true;
        stream = state.streams[id];
      } else {
        // User Not authorized
        stream = null; // bcz if we send stream as "" and previously also if result was ""; component will not rerendered
      }
    }
    return stream;
  });

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Please SignIn To Edit this Stream</h1>
      </div>
    );
  }

  if (!isUserAuthorized) {
    return (
      <div>
        <h1>You are Not Authorized to Edit this Stream</h1>
      </div>
    );
  }

  if (!streamToEdit) {
    // 1st time when Edit component renders after user directly opens edit page and logged In; there will be no stream and hence result of useSelector will be undefined. After this useEffect will run and stream will be fetched and hence use will see the required stream to edit
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Edit Stream</h3>
      <StreamForm onSubmit={onSubmit} initialValues={streamToEdit} />
    </div>
  );
};

export default StreamEdit;
