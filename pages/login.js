import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
import firebaseConfig from "../src/component/firebaseConfig";
import { useRouter } from "next/router";

function login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  let uid;

  const a = async () => {
    await signInWithEmailAndPassword(auth, gmail, password)
      .then((userCredential) => {
        uid = userCredential.user.uid;

        console.log(uid);
        console.log(" successs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

    if (uid) {
      const docRef = doc(db, `users/${uid}`);

      let userPermission = await getDoc(docRef);

      let userPermission1 =
        userPermission._document.data.value.mapValue.fields.permission
          .stringValue;

      console.log(userPermission1);
      if (userPermission1 == 1) {
        router.push("/monitor");
      } else {
        let className =
          userPermission._document.data.value.mapValue.fields.class.stringValue;
        router.push(`/class/${className}`);
      }
    }
  };

  return (
    <div className="cont center">
      <div className="login-background">
        <div className="login-title">Нэвтрэх</div>
        <TextField
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          className="mar"
          id="outlined-basic"
          label="Gmail"
          variant="outlined"
        />
        <TextField
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="mar"
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button onClick={a} variant="contained">
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default login;
