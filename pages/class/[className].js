import * as React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState , useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import firebaseconfig from "../component/firebaseconfig";

 function  Class () {
  const app = initializeApp(firebaseconfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const Col = collection(db, "students/");
  const uid = auth.currentUser.uid;
  const docRef = doc(db, `users/${uid}`);
  const router = useRouter();
  const className = router.query.className;
  // dataagaa await hiij avmaar bainaaa


    const [data, setData] = useState();
    useEffect(() => {
    const getData = async () => {
    //asdfasdf
    // const res = await /asfasdf/
    setData(res.data);
    };
    getData();
    }, []);
    
  


  getDoc(docRef)
 


  let userPermission =
    userData._document.data.value.mapValue.fields.permission.stringValue;
  console.log(userPermission);

  // const docRef = doc(db ,`users/${uid}`)
  // let userPermission =  getDoc(docRef)
  // console.log(userPermission)

  return <div>irtsee burtguulyaa {className}</div>;
}
export default Class