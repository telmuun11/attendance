import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SignIn() {
  let d = [];
  let c = [];

  for (let i = 0; i < 27; i++) {
    d.push("kita");
  }
  for (let i = 0; i < 27; i++) {
    c.push("Бүтэн");
  }

  const [irts, setIrts] = React.useState(d);
  const [duration, setDuration] = React.useState(c);
  let List = ["Brooks","Rachel","Edwards","Christopher","Perez","Thomas","Baker","Sara","Moore","Chris","Bailey","Roger","Johnson","Marilyn","Thompson","Anthony","Evans","Julie","Hall","Paula","Phillips","Annie","Hernandez","Dorothy","Murphy","Alice","Howard",];
  const Row = (e, index) => {
    const handleChange = (event) => {
      let a = irts;
      a[index] = event.target.value;
      console.log(irts)
      setIrts(a);
    };
    const handleChange1 = (event) => {
      let a = duration;
      a[index] = event.target.value;

      setDuration(a);
      console.log(duration);
    };


    return (
      <div className="cont1">
        <div className="w101">  {List[index]}</div>
      
        {/* <div className="w100 " > */}
        <Box className="w100">
          <FormControl  fullWidth size="small">
            <InputLabel  id="demo-simple-select-label">irts</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={irts[index]}
              label="Irts"
              onChange={handleChange}
      
            >
              <MenuItem value={"kita"}>kita</MenuItem>
              <MenuItem value={"nai"}>nai</MenuItem>
              <MenuItem value={"byouki"}>byouki</MenuItem>
              <MenuItem value={"jiyu"}>jiyu </MenuItem>
            </Select>
          </FormControl>
          </Box>
        {/* </div> */}
        {/* 5041355868 */}
        {/* mongol ulsiin ih surguuli */}
      

        <Box className="w100">
          <FormControl fullWidth  size="small">
            <InputLabel id="demo-simple-select-label">length</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={duration[index]}
              label="length"
              onChange={handleChange1}
           
            >
              <MenuItem value={"Бүтэн"}>Бүтэн</MenuItem>
              <MenuItem value={"1 цаг"}>1 цаг</MenuItem>
              <MenuItem value={"2 цаг"}>2 цаг</MenuItem>
              <MenuItem value={"3 цаг"}>3 цаг</MenuItem>
              <MenuItem value={"4 цаг"}>4 цаг</MenuItem>
              <MenuItem value={"5 цаг"}>5 цаг</MenuItem>
              <MenuItem value={"6 цаг"}>6 цаг</MenuItem>
              <MenuItem value={"7 цаг"}>7 цаг</MenuItem>
              <MenuItem value={"8 цаг"}>8 цаг</MenuItem>
              <MenuItem value={"9 цаг"}>9 цаг</MenuItem>
            </Select>
          </FormControl>
        </Box>
      

      </div>
    );
  };

  return irts.map((e, index) => {
    return Row(e, index);
  });
}
