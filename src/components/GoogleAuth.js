import React from "react";
import { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux';
import { SignIn, SignOut } from "../actions";

/*
    Watch Youtube video - https://www.youtube.com/watch?v=roxC8SMs7HU
    OR follow documentation - https://developers.google.com/identity/gsi/web/guides/display-button#javascript
*/
/*
    Some useful methods
    // After revoking , next time user needs to provide consent during sign in
    window.google.accounts.id.revoke(user.email, done => {
        console.log('consent revoked', done);
    });

    // Remove auto sign in. if we have used  auto_select: true, during initialization
    window.google.accounts.id.disableAutoSelect(); 
*/
function GoogleAuth(props){
    const signInRef = useRef('');
    const user = useRef(null);

    function handleCallbackResponse(response){
        const userObject = jwt_decode(response.credential);
        console.log(`%cDecoded Json Web Token ID token: %c${userObject}`,
        "font-size:1rem; color:red;",
        "font-size:1rem; color:green;"
        );

        signInRef.current.hidden = true;
        user.current = userObject;
        onAuthChange(true, userObject.sub);
    }

    function handleSignOut(e){
        user.current = {};
        signInRef.current.hidden = false;
        onAuthChange(false);
    }

    const onAuthChange = (isSignedIn, userId) => {
        if(isSignedIn) {
            props.SignIn(userId); // Action creator will return action that will get dispatched and state gets updated and mapStateToProps gets invoked
        } else{
            props.SignOut();
        }
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: '838077339684-d2um3v2usur059i1ucg3343jupbtip1t.apps.googleusercontent.com',
            context: "signin",
            callback: handleCallbackResponse,
            // auto_select: true, // Works only if we 1st logout from all google accounts and then login with 1 account only - ?
            // cancel_on_tap_outside: false,
            // custom_attr1: "This is custom attribute1",
            // custom_attr2: "This is custom attribute2"
        });

        onAuthChange(false); // bcz initially user is not signed in
        
        window.google.accounts.id.renderButton(
            signInRef.current,
            { theme: "outline", size: "medium", type: "icon"}  // customization attributes
        );

        // window.google.accounts.id.prompt(); // also display the One Tap dialog
    }, []); 

    // If we have no user: sign in button
    // If we have a user: show the log out button
    return (
        <div>
            <div id="g_id_onload" ref={signInRef}></div>
    
            { props.isSignedIn &&
                <div>
                    <img className="ui avatar image" src={user.current.picture} />
                    <span>{user.current.name}</span>
                    <button className="g_id_signout ui red google button" style={{ marginLeft: 15 }} onClick={(e) => {handleSignOut(e)}}>
                        <i className="google icon" /> Sign Out !
                    </button> 
                </div>
            }
            
        </div>
    );

}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }; // This will be passed as props in GoogleAuth component
}

export default connect(mapStateToProps, {SignIn, SignOut})(GoogleAuth);
