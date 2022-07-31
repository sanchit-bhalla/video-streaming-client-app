import React from "react";
import { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";

/*
    Watch Youtube video - https://www.youtube.com/watch?v=roxC8SMs7HU
    OR follow documentation - https://developers.google.com/identity/gsi/web/guides/display-button#javascript
*/
function GoogleAuth(){
    const signInRef = useRef('');
    const [user, setUser] = useState();

    function handleCallbackResponse(response){
        const userObject = jwt_decode(response.credential);
        console.log(`%cDecoded Json Web Token ID token: %c${userObject}`,
        "font-size:1rem; color:red;",
        "font-size:1rem; color:green;"
        );

        signInRef.current.hidden = true;
        setUser(userObject);
    }

    function handleSignOut(e){
        window.google.accounts.id.disableAutoSelect();
        setUser('');
        signInRef.current.hidden = false;
    }

    useEffect(() => {
        console.log("%c USE EFFECT", "color:red");
        window.google.accounts.id.initialize({
            client_id: '838077339684-d2um3v2usur059i1ucg3343jupbtip1t.apps.googleusercontent.com',
            callback: handleCallbackResponse,
            auto_select: true,
            // cancel_on_tap_outside: false
        });

        window.google.accounts.id.renderButton(
            signInRef.current,
            { theme: "outline", size: "large" }  // customization attributes
        );

        window.google.accounts.id.prompt(); // also display the One Tap dialog
    }, []);

    // If we have no user: sign in button
    // If we have a user: show the log out button
    console.log(user);
    return (
        <div>
            <div ref={signInRef} ></div>

            { user && <button className="g_id_signout" onClick={(e) => {handleSignOut(e)}}>Sign Out !</button> }
            

            {
                user &&
                <div>
                    <img src={user.picture} />
                    <h3>{user.name}</h3>
                </div>
            }
        </div>
    );

}

export default GoogleAuth;
