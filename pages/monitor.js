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
} from "firebase/firestore";
import { useRouter } from "next/router";
import firebaseconfig from "./component/firebaseconfig";
import SearchIcon from "@mui/icons-material/Search";

export default function Monitor() {
  const app = initializeApp(firebaseconfig);
  const auth = getAuth(app);
  const [isuser, setIsuser] = useState(auth.currentUser);
  const [data, setData] = useState([0, 0, 0, ["-uy", 0], ["?-?", 0]]);

  const db = getFirestore(app);
  const router = useRouter();
  let tas = 0;
  let uvchtei = 0;
  let chuluutei = 0;
  let a = [0, 0, 0];
  let gurav = [0, 0, 0, 0, 0];
  let durev = [0, 0, 0, 0, 0];
  let tav = [0, 0, 0, 0, 0];

  const b = ["tasalsan ", "uvchtei", "chuluutei", "tas ih uy", "tas ih angi"];

  const boox = (title, numbaa) => {
    return (
      <div className="box">
        <div className="t1"> {title}</div>
        <div className="t2">{numbaa}</div>
      </div>
    );
  };

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;

  useEffect(() => {
    const getData = async () => {
      const q = collection(db, `2-2`);

      const daata = await getDocs(q);
      console.log(daata);
      let final = [];
      let angi = [];
      let irts = [];
      for (let i = 0; i < daata._snapshot.docChanges.length; i++) {
        irts.push(
          daata._snapshot.docChanges[i].doc.data.value.mapValue.fields.attendance
          .stringValue.split(" ")[0]
        );
      }

      for (let i = 0; i < daata._snapshot.docChanges.length; i++) {
        angi.push(
          daata._snapshot.docChanges[i].doc.data.value.mapValue.fields.class
            .stringValue
        );
      }
      console.log("iirts : " ,irts)
      for (let i = 0; i < angi.length; i++) {
    

        if (irts[i] == "byoki") {
          uvchtei = uvchtei + 1;
        }
        if (irts[i] == "jiyu") {
          chuluutei = chuluutei + 1;
        }
      }
  

      let mu = [];
      if (gurav[4] > tav[4]) {
        if (gurav[4] > durev[4]) {
          mu[0] = "gurav";
          mu[1] = gurav[4];
        } else mu[0] = "durev";
      } else {
        if (tav[4] > durev[4]) {
          mu[1] = tav[4];
          mu[0] = "tav";
        } else {
          mu[1] = durev[4];
          mu[0] = "durev";
        }
      }
      let max = [];
      max.push(...tav.slice(0, 4));
      max.push(...durev.slice(0, 4));
      max.push(...gurav.slice(0, 4));
      let frm = [0, 0];
   
      for (let i = 0; i < max.length; i++) {
        if (frm[0] < max[i]) {
          frm[0] = max[i];
          frm[1] = i;
        }
      }
    
      let tasangi = 10 + Math.floor(frm[1]/4);

 

      let taskumi = (frm[1]+1) % 4;
      console.log(taskumi)
      if (taskumi == 0) {
        taskumi = 4;
      }
      final = [
        tas,
        uvchtei,
        chuluutei,
        [mu[0], mu[1]],
        [`${tasangi}-${taskumi}`, frm[0]],
      ];
      setData(final);
    };

    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (isuser == null) {
      router.push("/login");
    }
  }, [isuser]);

  return (
    <div className="row">
      <div className="f1">
        <div className="head">Attendance</div>
        <div className="col c1">
          <div className="row sidec">
            <SearchIcon className="sidec1" />
            <div className="sidec1">Search</div>
          </div>
          <div className="sidec">III </div>
          <div className="sidec" onClick={()=>  router.push(`/gen/${11}`) }>IV </div>
    

          <div className="sidec">V </div>
        </div>
      </div>
      <div className="f2">
        <div className="row">
          {/* const b = ["tasalsan ", "uvchtei", "chuluutei", "tas ih uy", "tas ih angi"]; */}
          {a.map((e, i) => {
            if (i == 0) {
              return <div className="t3">{`${month}/${day}`}</div>;
            }

            return boox(b[i - 1], data[i - 1]/2);
          })}
        </div>
        <div className="row">
          {a.map((e, i) => {
            if (i == 0) {
              return boox(b[i + 2], data[i + 2]/2);
            }
            return boox(b[i + 2], `${data[i + 2][0]} : ${data[i + 2][1]/2}`);
          })}
        </div>
      </div>
    </div>
  );
}
