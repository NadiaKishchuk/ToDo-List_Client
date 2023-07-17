import { Badge } from "antd";
import React, { MouseEventHandler } from "react";
import { TaskColors } from "./Interfaces/Color/TaskColorInterface";
import { TaskInterface, ToDoTaskStatus } from "./Interfaces/TaskInterface";
function textColor(status:ToDoTaskStatus){

    return status===ToDoTaskStatus.New?"#108243"
    :(status===ToDoTaskStatus.InProgress?"#fd3a30":"#fdd900");

}
export const TaskListItemCalendar: React.FC<{task:TaskInterface,
    onClick:MouseEventHandler<HTMLLIElement>}> = (props)=>{
    return (<li className="calendar-list-item" key={props.task.id} onClick={props.onClick} style={{color:textColor(props.task.status)}}> 
    <Badge key={props.task.id} className="badge" color={TaskColors.getColor(props.task.taskColorId)} /> {props.task.title}
    </li>)
}