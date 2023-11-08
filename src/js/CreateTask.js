import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../css/CreateTask.css";
import axios from "axios";


export default function Create(props){
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDueDate, setTaskDueDate] = useState(new Date());
    const [taskPriority, setTaskPriority] = useState("");

    const{groupID} = useParams();
    const parsedGroupID = parseInt(groupID, 10);
    const userID = sessionStorage.getItem("userID");
    const initialStatus = "not started";

    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleCreateTask(){
        if (taskName === "") { 
            setError("Please enter a name for your Task!");
            return;
        }
        if (taskDescription === "") { 
            setError("Please enter a Description for your Task!");
            return;
        }
        if (taskDueDate === "") { 
            setError("Please enter a due date for your Task!");
            return;
        }
        if (taskPriority === "") { 
            setError("Please enter a priority for your Task!");
            return;
        }
        console.log(taskName);
        console.log(taskDueDate);
        console.log(taskDescription);
        console.log(taskPriority);
        const isoDueDate = taskDueDate.toISOString();
        axios.post("http://localhost:8080/task/create", 
        {"name":taskName, "description":taskDescription, "dueDate":taskDueDate,
        "priority":taskPriority, "status":initialStatus,"userID":userID, "groupID":parsedGroupID})
        .then((response) => { 
            const {message} = response.data;
            if (message !== "Task created successfully"){
                setError(message);
                return;
            }
            navigate("/");
        })
        .catch((error) => { 
            setError("An unexpected error occured!");
            return;
        })
        
    }

    //npm install react-datepicker date-fns
    const handleDateChange = (date) => {
        setTaskDueDate(date);
    };

    return (
        <div className = "createTaskPage">
            <div className = "createTaskForm">
                <h1>Create Task</h1>
                <input className = "taskName" value = {taskName} placeholder = "Enter task name" 
                onChange = {(e) => setTaskName(e.target.value)} ></input>
                <input className = "taskDescription" value = {taskDescription} placeholder = "Enter task description" 
                onChange = {(e) => setTaskDescription(e.target.value)} ></input>
                <DatePicker selected={taskDueDate} showTimeSelect timeFormat="HH:mm"
                timeIntervals={15} dateFormat="yyyy-MM-dd HH:mm:ss" onChange={handleDateChange}/>
                <select value={taskPriority} onChange = {(e) => setTaskPriority(e.target.value )}>
                    <option value="" disabled selected>Select task priority</option>
                    <option value={"low"}>Low</option>
                    <option value={"normal"}>Normal</option>
                    <option value={"medium"}>Medium</option>
                    <option value={"high"}>High</option>
                </select>
                <br></br>
                {error !== "" && <h3 className = "errorMessage">{error}</h3>}
                <button className = "createButton" onClick = {handleCreateTask}>Create Task!</button>
                <br></br>
                <button className = "goHome" onClick = {() => navigate("/home")}>home</button>
            </div>
        </div>);
}