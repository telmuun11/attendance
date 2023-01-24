import * as React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import firebaseconfig from "../component/firebaseconfig";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
      const q = query(collection(db, "students"), where("class", "==", "12-1"));

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


  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  if (isuser && data) {
    let uid = auth.currentUser.uid;

    let List = data._snapshot.docChanges;
    console.log(List);

    return (
      <div>
        <div>irtsee burtguulyaa {className}</div>
      <Row/>
        {List.map((e) => {
          return <div>{e.doc.key.path.segments[6]}</div>;
        })}
      </div>
    );
  }

  return <div> aldaa </div>;
}
export default Class;

  const [age, setAge] = React.useState([]);
  // angi angiar avah -> name
// udruud shuuh -> doc id == name rec
// angiin jagsaalt irtsiin -> not nescessery
// suragch yalgah most-> for all -> not necsessery
// n.namuun 12-3

const Row = ()=>{

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return <div className="cont1">
  M.Telmuun
  <div className="w100 ">
  
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
  
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age}
        label="Irts"
        onChange={handleChange}
        autoWidth={true}
      >
        <MenuItem value={"irsen"}>irsen</MenuItem>
        <MenuItem value={"tas"}>Tas</MenuItem>
        <MenuItem value={"uivchtei"}>Uvchtei</MenuItem>
        <MenuItem value={"chuluutei"}>Chuluutei </MenuItem>
      </Select>
    </FormControl>
  
  </div>
  <Box className="w100">
    <FormControl fullWidth size="small" >
      <InputLabel id="demo-simple-select-label">Irts</InputLabel>
      <Select
      
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age}
        label="Irts"
        onChange={handleChange}
      >
        <MenuItem value={"bu"}>Buten Udur</MenuItem>
        <MenuItem value={"1"}>1</MenuItem>
        <MenuItem value={"2"}>2</MenuItem>
        <MenuItem value={"3"}>3</MenuItem>
        <MenuItem value={"4"}>4</MenuItem>
        <MenuItem value={"5"}>5</MenuItem>
        <MenuItem value={"6"}>6</MenuItem>
        <MenuItem value={"7"}>7</MenuItem>
        <MenuItem value={"8"}>8</MenuItem>
        <MenuItem value={"9"}>9</MenuItem>
      </Select>
    </FormControl>
  </Box>
  </div>
}

// yamarch bsn age ee array bolgood indexee eventeige hamt hiiged eventere arr[i]=event.data 
// <select tag deer baigaa value d ni utga uguhgui bl bolohgui bnlee tgheer arr[i] geed uguud uznu 
// owarimashoyou
