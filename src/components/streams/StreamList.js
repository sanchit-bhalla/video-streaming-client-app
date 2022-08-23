import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

const StreamList = (props) => {
  const renderDeleteAndEditButtons = (stream) => {
    if (stream.userId === props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui primary button">
            Edit
          </Link>

          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui negative button"
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    const streamArr = Object.values(props.streams);
    return streamArr.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderDeleteAndEditButtons(stream)}
          <i
            className="large middle aligned icon camera"
            style={{ color: "#2185d0" }}
          ></i>
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <div style={{ float: "right", marginRight: 5 }}>
          <Link className="ui button primary" to="/streams/new">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  React.useEffect(() => {
    props.fetchStreams();
  }, []);

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streams: state.streams,
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };

  /*
  Don't do calculation here bcz then every time we return new result; StreamList component gets rerender. This will give us warning when we move to create stream Link bcz of redux store updating from form state.
  SOLUTION -->  Either memoize the result here (Memoized Selectors with Reselect)or
  Sol. 2 -->  send the result directly and mutate it inside component which we did here bcz if we send directly it automatically do shallow comparison. So if prev and curr obj is same, it will not rerender StreamList
  */
  //   return { streams: Object.values(state.streams) }; // convert into array form so that it will be easy to loop over it
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
