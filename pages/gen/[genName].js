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

function Generetion() {
  const app = initializeApp(firebaseconfig);
  const auth = getAuth(app);
  const [isuser, setIsuser] = useState(auth.currentUser);
  const [data, setData] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const db = getFirestore(app);
  const router = useRouter();
  const genName = router.query.genName;
  const slot = ["тасалсан", "өвчтэй", "чөлөөтэй"];

  let tas = [0, 0, 0, 0, 0];
  let uvchtei = [0, 0, 0, 0, 0];
  let chuluutei = [0, 0, 0, 0, 0];
  let dummy = [0, 0, 0, 0];
  let dummy2 = [0, 0, 0];
  useEffect(() => {
    if (isuser == null) {
      router.push("/login");
    }
  }, [isuser]);

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "2-2"),
        where("class", "in", [
          `${genName}-1`,
          `${genName}-2`,
          `${genName}-3`,
          `${genName}-4`,
        ])
      );

      const daata = await getDocs(q);
      console.log(daata);
      let angi = [];
      let irts = [];
      for (let i = 0; i < daata._snapshot.docChanges.length; i++) {
        irts.push(
          daata._snapshot.docChanges[
            i
          ].doc.data.value.mapValue.fields.attendance.stringValue.split(" ")[0]
        );
      }

      for (let i = 0; i < daata._snapshot.docChanges.length; i++) {
        angi.push(
          daata._snapshot.docChanges[i].doc.data.value.mapValue.fields.class
            .stringValue
        );
      }

      for (let i = 0; i < daata._snapshot.docChanges.length; i++) {
        if (irts[i] == "nai") {
          let kumi = angi[i].split("-")[1];
          tas[4] = tas[4] + 1 / 2;
          tas[kumi - 1] = tas[kumi - 1] + 1 / 2;
        }
        console.log(tas);
        if (irts[i] == "byoki") {
          let kumi = angi[i].split("-")[1];
          uvchtei[4] = uvchtei[4] + 1 / 2;
          uvchtei[kumi - 1] = uvchtei[kumi - 1] + 1 / 2;
        }

        if (irts[i] == "jiyu") {
          let kumi = angi[i].split("-")[1];
          chuluutei[4] = chuluutei[4] + 1 / 2;
          chuluutei[kumi - 1] = chuluutei[kumi - 1] + 1 / 2;
        }
      }

      setData([tas, uvchtei, chuluutei]);
    };

    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const boox = (index) => {
    return (
      <div className="box1">
        <div className="t1">
          {" "}
          {genName}-{index + 1}
        </div>
        <div className="t2">тасалсан: {data[0][index]}</div>
        <div className="t2">өвчтэй: {data[1][index]}</div>
        <div className="t2">чөлөөтэй: {data[2][index]}</div>
      </div>
    );
  };
  const circle = (index) => {
    return (
      <div className="box2">
        <div className="t4">{slot[index]}</div>
        <div className="t4">{data[index][4]}</div>
      </div>
    );
  };

  return (
    <div className="cont center">
      <div className="col">
        <div className="row ccont">
          <div className="title">{genName}</div>
          {dummy2.map((e, index) => {
            return circle(index);
          })}
        </div>
        <div className="row even">
          {dummy.map((e, index) => {
            return boox(index);
          })}
        </div>
      </div>
    </div>
  );
}
export default Generetion;

// angi angiar avah -> name
// udruud shuuh -> doc id == name rec
// angiin jagsaalt irtsiin -> not nescessery
// suragch yalgah most-> for all -> not necsessery
// n.namuun 12-3
