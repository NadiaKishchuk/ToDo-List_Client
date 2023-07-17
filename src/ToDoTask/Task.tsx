import { Calendar } from "antd";
import React from "react";
import { TaskInterface } from "./Interfaces/TaskInterface";

export const Task: React.FC<TaskInterface>=()=>{
    return (
        <div>
            <Calendar></Calendar>
        </div>
    )
}