
import React, {useEffect, useState} from "react";
import axios from "axios";
import {DatePicker} from "antd";

export const Todo = () => {
    const [taskDate, setTaskDate] = useState("");
    // const [user, setUser] = useState("");
   // const [taskTime, setTaskTime] = useState("");
    const [taskIsCompleted, setTaskIsCompleted] = useState(0);
    const [taskTimeZone, setTaskTimeZone] = useState("");
    const [taskMsg, setTaskMsg] = useState("");
    const [addTask , setAddTask] = useState(false)

    useEffect(() => {
        findAll()
    },[])
    const handleTask = () => {
        setAddTask(true);
    }
    const handleFormSubmit = async () => {
        const date = new Date(taskDate.$d);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const convertedDate = `${year}-${month}-${day}`;
        const timeInSeconds = Math.floor(date.getTime() / 1000);
        const response = await axios.post("https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=company_0f8d040401d14916bc2430480d7aa0f8", {
            assigned_user: "user_8c2ff2128e70493fa4cedd2cab97c492",
            task_date: convertedDate,
            task_time: timeInSeconds,
            is_completed:parseInt(taskIsCompleted),
            time_zone:19800,
            task_msg: taskMsg,
        },{
            headers: {
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODYzNDIwMjYsIm5iZiI6MTY4NjM0MjAyNiwianRpIjoiNzk1ZTg0MTAtZWJlMS00ZmFlLWIzNTktNDE1NGUwZmZkMTAxIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.Y4vkFCGJnNm2YAE-d_CUaa_OnN3s2gy7KkPvPFJ1GZ8"
            }
        })

        console.log(response);
    }


    const findAll = async () => {

        const response = await axios.get("https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=company_0f8d040401d14916bc2430480d7aa0f8", {
            headers: {
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODYzNDIwMjYsIm5iZiI6MTY4NjM0MjAyNiwianRpIjoiNzk1ZTg0MTAtZWJlMS00ZmFlLWIzNTktNDE1NGUwZmZkMTAxIiwiaWRlbnRpdHkiOnsibmFtZSI6IlNhcmF2YW5hbiBDIiwiZW1haWwiOiJzbWl0aHdpbGxzMTk4OUBnbWFpbC5jb20iLCJ1c2VyX2lkIjoidXNlcl84YzJmZjIxMjhlNzA0OTNmYTRjZWRkMmNhYjk3YzQ5MiIsImljb24iOiJodHRwOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvY2Y5NGI3NGJkNDFiNDY2YmIxODViZDRkNjc0ZjAzMmI_ZGVmYXVsdD1odHRwcyUzQSUyRiUyRnMzLnNsb292aS5jb20lMkZhdmF0YXItZGVmYXVsdC1pY29uLnBuZyIsImJ5X2RlZmF1bHQiOiJvdXRyZWFjaCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.Y4vkFCGJnNm2YAE-d_CUaa_OnN3s2gy7KkPvPFJ1GZ8"
            }
            }
        )
        const users = response.data.results.map((userItem) => userItem.assigned_user);
        const uniqueUserNames = [...new Set(Object.values(users).filter(value => typeof value === 'string'))];
        console.log(uniqueUserNames);
        // console.log(response.data.results.);
    }


    return (
        <>
            { addTask ?
        <div className="">
            <h3>Task Form</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                <label htmlFor="task_date">Task Date:</label>
                    <DatePicker className="form-control" value={taskDate}
                                 onChange={(date) => setTaskDate(date)}
                                 required/>
                </div>
                <div>
                    <label htmlFor="appt">Select a time:</label>
                    <input type="time" id="appt" name="appt"/>
                </div>

                <div className="form-group">
                <label>Is Completed:</label><br />
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="is_completed_yes"
                        name="is_completed"
                        value="1"
                        checked={taskIsCompleted === "1"}
                        onChange={(e) => setTaskIsCompleted(e.target.value)}
                        required
                    />
                    <label className="form-check-label" htmlFor="is_completed_yes">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="is_completed_no"
                        name="is_completed"
                        value="0"
                        checked={taskIsCompleted === "0"}
                        onChange={(e) => setTaskTimeZone(e.target.value)}
                        required
                    />
                    <label className="form-check-label" htmlFor="is_completed_no">No</label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="time_zone">Time Zone:</label>
                <input
                    type="number"
                    className="form-control"
                    id="time_zone"
                    value={taskTimeZone}
                    onChange={(e) => setTaskTimeZone(e.target.value)}
                    required
                />
            </div>


            <div className="form-group">
                <label htmlFor="task_msg">Task Description:</label>
                <textarea
                    className="form-control"
                    id="task_msg"
                    value={taskMsg}
                    onChange={(e) => setTaskMsg(e.target.value)}
                    required
                />
            </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>

        </div>
                :
                <div>


            <div>Add Task </div>
                    <button onClick={handleTask}>Add task</button>
                </div>
            }


        </>
    )
}