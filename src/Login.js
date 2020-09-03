import React, { useEffect } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import firebase from "firebase";

function Login() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user);
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
    });
  }, []);

  const signIn = () => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        try {
          const result = await auth.signInWithPopup(provider);
          console.log(result);
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
          });
        } catch (error) {
          return alert(error.message);
        }
      })
      .catch((error) => {
        console.log(`Error Code: ${error.code}`);
        console.log(`Error message: ${error.message}`);
      });
  };
  return (
    <div className="login">
      <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="logo" />

      <Button type="submit" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Login;
