import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function SignIn() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="cont1">
      M.Telmuun
      <div className="w100 ">
   
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
  
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Irts"
            onChange={handleChange}
            autoWidth={true}
          >
            <MenuItem value={"bir"}>birsen</MenuItem>
            <MenuItem value={"tas"}>Tas</MenuItem>
            <MenuItem value={"uivchtei"}>Uvchtei</MenuItem>
            <MenuItem value={"chuluutei"}>Chuluutei </MenuItem>
          </Select>
        </FormControl>
  
      </div>
      <Box className="w100">
        <FormControl fullWidth size="small" >
          <InputLabel id="demo-simple-select-label">length</InputLabel>
          <Select
          
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
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
  );
}
