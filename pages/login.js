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
import firebaseConfig from "./component/firebaseconfig";
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
    <div className="cont">
      <img
        className="imag"
        src="https://scontent.fuln6-2.fna.fbcdn.net/v/t1.6435-9/139499556_908073433066078_8849535996146205179_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UdPFEDE7O-QAX_OtOTf&_nc_ht=scontent.fuln6-2.fna&oh=00_AfBWcYNdjjF79ujj5finARKUnWjsdyETPnPb-frAY2pP8w&oe=63AA6CAE"
        alt=""
      />
      <div className="head">nevtreh</div>
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
      <div></div>
    </div>
  );
}

export default login;
