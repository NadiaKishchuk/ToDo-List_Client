import { Calendar } from "antd";
import React, {   } from "react";
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { TaskListItemCalendar } from "./TaskListItemCalendar";
import { TaskInterface } from "./Interfaces/TaskInterface";

export const TaskCalendar: React.FC<{handleOnClick:Function, toDoList: Array<TaskInterface>}> = (props) => {

    const getTaskDate = (date: Dayjs): TaskInterface[] => {
        return props.toDoList.filter(t =>date.isSame(dayjs(t.dateTime),'day') );
      }

      const getTaskMonth = (date: Dayjs): TaskInterface[] => {
        return props.toDoList.filter(t =>date.isSame(dayjs(t.dateTime),'month') );
      }

    const dateCellRender = (date: Dayjs) => {
        const listData = getTaskDate(date);
        return (
          <ul className="calendar-list">
            {listData.map((item) => (
              <TaskListItemCalendar task={item} onClick={() => { props.handleOnClick(item.id) }}></TaskListItemCalendar>
            ))}
          </ul>
        );
      };

      const monthCellRender= (date: Dayjs) => {
        const listData = getTaskMonth(date);
        return (
          <ul className="events" style={{ justifyContent: "start", padding: 0, margin: 0, listStylePosition: "outside" }}>
            {listData.map((item) => (
              <TaskListItemCalendar task={item} onClick={() => { props.handleOnClick(item.id) }}></TaskListItemCalendar>
            ))}
          </ul>
        );
      };

    return <Calendar className="calendar" monthCellRender={monthCellRender}  dateCellRender={dateCellRender}  />
}