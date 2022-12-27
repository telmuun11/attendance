import * as React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import firebaseconfig from "../component/firebaseconfig";

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
  let col = collection(db, `/students/4thgen/${className}`);

  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await getDocs(col);

      setData(res);
    };

    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (isuser && data) {
    let uid = auth.currentUser.uid;
    // let docRef = doc(db, `users/${uid}`);

    // let classNumber = className.split("-")[0];
    // let uy = 15 - classNumber;
    let docref = doc(db, "/students/4thgen");

   

    console.log(data._snapshot.docChanges);
    const List= data._snapshot.docChanges;

    //   import { collection, getDocs } from "firebase/firestore";

    // const querySnapshot = await getDocs(collection(db, "cities"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    return (
      <div>
        <div>irtsee burtguulyaa {className}</div>
        {
          List.map((e)=>{
            return <div>{e.doc.key.path.segments[8]}</div>
          })
        }
      </div>
    );
  }

  return <div> aldaa </div>;
}
export default Class;

// dataagaa await hiij avmaar bainaaa

// useEffect(() => {
// const getData = async () => {
// const res = await   getDoc(docRef)
// setData(res);
// };
// getData();
// }, []);
// let userPermission =
//   userData._document.data.value.mapValue.fields.permission.stringValue;
// console.log(userPermission);

// const docRef = doc(db ,`users/${uid}`)
// let userPermission =  getDoc(docRef)
// console.log(userPermission)
