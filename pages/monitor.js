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
import SearchIcon from '@mui/icons-material/Search';

export default function darga() {
  const app = initializeApp(firebaseconfig);
  const auth = getAuth(app);
  const [isuser, setIsuser] = useState(auth.currentUser);
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    if (isuser == null) {
      router.push("/login");
    }
  }, [isuser]);

  const [data, setData] = useState();

  return (
    <div className="row">

      <div className="f1">
        <div className="row ">
          <SearchIcon className="sidec1" />
       
        <div className="sidec1">Search</div>

        </div>
        <div className="col c1">
        <div className="sidec">III uy</div>
        <div className="sidec">IV uy</div>
        <div className="sidec">V uy</div>
        </div>
   
      </div>
      <div className="f2">lala</div>
    </div>
  );
}

// useEffect(() => {
//   const getData = async () => {
//     const q = query(
//       collection(db, "students"),
//       where("class", "==", className)
//     );

//     const daata = await getDocs(q);
//     console.log(daata);
//     setData(daata);
//   };

//   try {
//     getData();
//   } catch (e) {
//     console.log(e);
//   }
// }, []);
