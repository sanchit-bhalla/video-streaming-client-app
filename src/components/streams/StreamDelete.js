import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history"; // To programmatically navigate to another route when user clicks outside Modal. Due to event bubbling effect we need to add e.stopPropagation() to the child of element where we add history.push; otherwise even if we click inside modal body, still it will close the modal

const StreamDelete = () => {
  let { id } = useParams();

  let isLoggedIn = false;
  let isUserAuthorized = false;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStream(id));
  }, []);

  // useSelector, useDispatch Hook -> Replacement for mapStateToProps and connect
  const streamToDelete = useSelector((state) => {
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

  const actions = (
    <>
      <button
        onClick={() => dispatch(deleteStream(id))}
        className="ui negative button"
      >
        Delete
      </button>

      <Link className="ui button" to="/">
        Cancel
      </Link>
    </>
  );

  const renderContent = () => {
    if (!streamToDelete) {
      // 1st time when Edit component renders after user directly opens edit page and logged In; there will be no stream and hence result of useSelector will be undefined. After this useEffect will run and stream will be fetched and hence use will see the required stream to edit
      return "Are you sure you want to delete this stream ?";
    }
    return `Are you sure you want to delete the stream with title: ${streamToDelete.title}`;
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Please SignIn To Delete this Stream</h1>
      </div>
    );
  }

  if (!isUserAuthorized) {
    return (
      <div>
        <h1>You are Not Authorized to Delete this Stream</h1>
      </div>
    );
  }

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push("/")}
    />
  );
};

export default StreamDelete;
