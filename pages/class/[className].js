import * as React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  writeBatch,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import firebaseconfig from "../../src/component/firebaseConfig";
import Row from "../../src/component/Row";
import { Button } from "@mui/material";

function Class() {
  const app = initializeApp(firebaseconfig);
  const auth = getAuth(app);
  const [isuser, setIsuser] = useState(auth.currentUser);
  const db = getFirestore(app);
  const router = useRouter();
  const className = router.query.className;
  useEffect(() => {
    if (isuser == null) {
      router.push("/login");
    }
  }, [isuser]);

  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "students"),
        where("class", "==", className)
      );

      const daata = await getDocs(q);
      console.log(daata);
      setData(daata);
    };

    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  let d = [];
  let c = [];

  for (let i = 0; i < 4; i++) {
    d.push("kita");
  }
  for (let i = 0; i < 4; i++) {
    c.push("Бүтэн");
  }

  const [irts, setIrts] = useState(d);
  const [duration, setDuration] = useState(c);

  if (isuser && data) {
    let length = data._snapshot.docChanges.length;

    let List = [];
    for (let i = 0; i < length; i++) {
      List.push(data._snapshot.docChanges[i].doc.key.path.segments[6]);
    }
    let uid = auth.currentUser.uid;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;

    const Submit = async () => {
      const batch = writeBatch(db);

      for (let i = 0; i < irts.length; i++) {
        const nycRef = doc(db, `${month}-${day}`, List[i]);
        batch.set(nycRef, { attendance: `${irts[i]} ${duration[i]}` });
      }
      await batch.commit();
    };
    return (
      <div className="container">
        <div>
          <div style={{ fontSize: "32px" }} className="class-name">
            Анги: {className}
          </div>
          {List.map((e, index) => {
            return Row(e, index, setDuration, setIrts, irts, duration, List);
          })}
        </div>
        <div style={{ width: "100%" }} className="center">
          <Button style={{ width: "90%" }} onClick={Submit} variant="contained">
            Ирц Бүртгүүлэх
          </Button>
        </div>
      </div>
    );
  }

  return <div> aldaa </div>;
}
export default Class;

// angi angiar avah -> name
// udruud shuuh -> doc id == name rec
// angiin jagsaalt irtsiin -> not nescessery
// suragch yalgah most-> for all -> not necsessery
// n.namuun 12-3
