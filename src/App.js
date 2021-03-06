import './App.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import students from './students.json'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function App() {

    let semesters = {
        name: "Semester",
        category: ["Fall", "winter", "Summer"]
    }

    let departments = {
        name: "department",
        category: ["Applied Science", "Mathematics"]
    }
    let gender = {
        name: "gender",
        category: ["male", "female"]
    }

    let RadioButtonsGroup = (props) => {
        let AllFields = props.category.map((cat) => <FormControlLabel value={cat} control={<Radio/>} label={cat}/>)
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{props.name}</FormLabel>
            <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
                id ={props.name}
            >
                <div className={"fields"}>
                    {AllFields}
                </div>
            </RadioGroup>
        </FormControl>
        )
    }

   let BasicSelect = (props) => {

       let MenuItems = props.category.map((cat) => <MenuItem value={cat}>{cat}</MenuItem>)

        const [option, setOption] = React.useState('');
        const handleChange = (event) => {
            setOption(event.target.value);
        };
        return (
            <Box sx={{ minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel style={{color : "white"}} id="demo-simple-select-label">{props.name}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={props.name==="department" ? "department" : "semesterPeriod"}
                        value={option}
                        onChange={handleChange}
                        style={{color : "white"}}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {MenuItems}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    let Header = () =>
            <Box sx={{ flexGrow: 1 }} className={"header"}>
                <AppBar style={{height : 90}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{position: "relative" , top : 10}}>
                            Students Manager
                        </Typography>
                        <div className={"dropdowns"}>
                            {BasicSelect(semesters)}
                            {BasicSelect(departments)}
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>



    let FormDialog = () => {
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        }

        return (
            <div>
                <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={handleClickOpen}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add a student</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           To add a student, he must be aged between 17 and 60.
                        </DialogContentText>
                        <TextField
                            className={"TextField"}
                            autoFocus
                            margin="dense"
                            id="firstName"
                            label="First name"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            className={"TextField"}
                            autoFocus
                            margin="dense"
                            id="lastName"
                            label="Last name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <div className={"TextField"}>
                            <p className={"label"}>Date of birth</p>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="age"
                                label=""
                                type="date"
                                fullWidth
                                variant="standard"
                            />
                        </div>
                        <div className={"radioButtons TextField"}>
                            {RadioButtonsGroup(gender)}
                            {RadioButtonsGroup(departments)}
                        </div>
                        <TextField
                            className={"TextField"}
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <div className={"TextField"}>
                            <p className={"label"}>Joining date</p>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="date"
                                label=""
                                type="date"
                                fullWidth
                                variant="standard"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => {handleClose() ; addStudent()}}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    let BasicCard = (props) =>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.student.firstName + " " + props.student.LastName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.student.Gender}
                </Typography>
                <Typography variant="body2">
                    {props.student.Department}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">{props.student.Email}</Button>
            </CardActions>
        </Card>

    let AllStudents = students.map((student) => <BasicCard student = {student}/>)

    let addStudent = () => {
        let student =
            {
                firstName : document.getElementById("firstName").value,
                LastName :  document.getElementById("lastName").value,
                Gender :  document.getElementById("gender").value,
                Department :   document.getElementById("department").value,
                Email :  document.getElementById("email").value,
                Age :  document.getElementById("age").value,
                joinDate : new Date (document.getElementById("date").value)
            }
            if (student.joinDate.getFullYear() > 2015){
                alert("Joining date must be a day before today.")
            }
        const fs = require('browserify-fs')
        const saveData = () => {
            const jsonData = JSON.stringify(student)
            fs.writeFile('students.json',jsonData, (error) => {if(error) throw error })
        }
        saveData()
    }

    let filterDepartment = (what) => {
        students.filter(student => student.Department === what)
    }

    let filterSemester = (period) => {
        if (period ==="winter"){
            students.filter(student => {
               let arr = student.joinDate.split("/")
                let month = arr[1]
                return month > 9 && month < 3
                }
            )
        }else if (period ==="summer"){
            students.filter(student => {
                let arr = student.joinDate.split("/")
                    let num = arr[1]
                   return num > 3 && num < 9
                }
            )
        }
    }

    let letsFilter = () => {
        let filterOne = document.getElementsByClassName("department")
        let filterTwo = document.getElementsByClassName("semesterPeriod")
        filterDepartment(filterOne.value)
        filterSemester(filterTwo.value)
    }
    letsFilter()
    console.log(students)
    return (
    <div className="App">
        <Header/>
        <div className={"container"}>
            <div className={"wrapper"}>
                {AllStudents}
            </div>
            <div className={"options"}>
                <FormDialog/>
            </div>
        </div>
    </div>
  );
}

export default App;
