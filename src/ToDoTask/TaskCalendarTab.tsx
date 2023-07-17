import {   Button, Divider, message, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import {  TaskInterface } from "./Interfaces/TaskInterface";

import { TaskForm } from "../Components/TaskForm";
import { TaskCalendar } from "./TaskCalendar";
import { ToDoTaskService } from "../Services/ToDoServices";
import { TaskView } from "../Components/TaskView";
import { NoticeType } from "antd/es/message/interface";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";


export const TaskCalendarTab: React.FC = () => {
 
  const [toDoList, setToDoList] = useState<Array<TaskInterface>>([]);

  function getTask(idTask: number): TaskInterface|undefined  {
    return toDoList.find(t => t.id === idTask);
  }

  const [addingNewTask,setAddingNewTask]= useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openMoreModal, setOpenMoreModal] = useState<boolean>(false);
  const [taskOnModal, setTaskOnModal] = useState<TaskInterface>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    
    return () => {
      ToDoTaskService.get()
      .then( (response)=> {
        console.log(response);      
        setToDoList(response.data);
        return response;
      })
      .catch(function (error: any) {
        console.log(error);
      }) 
    }
}, [addingNewTask]); 


  function handleOnClick(idTask: number) {
    setTaskOnModal(getTask(idTask));
    setOpenMoreModal(true);
  }

  const handleDelete= () =>{
    let messageText:string; 
    let typeMessage:NoticeType;
    

    ToDoTaskService.deleteById(taskOnModal?.id!)
    .then(function (response) {
      setToDoList(toDoList.filter(t=>t.id!==taskOnModal?.id!))
      typeMessage = 'success'
      messageText = "Task successfully deleted :)"
    })
    .catch(function (error) {
      console.log(error);
      typeMessage = 'error'
      messageText = "Task wasn`t deleted :)"
    })
    .finally(()=>{
      messageApi.open({
        duration: 2,
        type: typeMessage,
        content:messageText ,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
      setOpenMoreModal(false);
    })
    
  }
  const constUpdateTask = (updatedTask:TaskInterface)=>{

    let newList:TaskInterface[] = [];
    toDoList.forEach(t=>newList.push(t))
    newList[newList.findIndex(t=>t.id===updatedTask.id)] = updatedTask;

    setToDoList(newList)
  }
  const handleUpdate = (updatedTask:TaskInterface)=>{
    let messageText:string; 
    let typeMessage:NoticeType;

    ToDoTaskService.postUpdate(updatedTask)
    .then(function (response) {
      
      constUpdateTask(updatedTask);
      typeMessage = 'success'
      messageText = "Task successfully updated :)"
    })
    .catch(function (error) {
      console.log(error);
      typeMessage = 'error'
      messageText = "Task wasn`t updated :("
    })
    .finally(()=>{
      messageApi.open({
        duration: 2,
        type: typeMessage,
        content:messageText ,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
      setOpenMoreModal(false);
    })
  }

  const handleCancel=()=>{
    setOpen(false);
  }


  function updateList(newTask:TaskInterface){
    let newList:TaskInterface[] = [];
    toDoList.forEach(t=>newList.push(t))
    newList.push(newTask);
    setAddingNewTask(addingNewTask+1);
  }

  const handleAdd = async (newTask:TaskInterface) =>{
    let messageText:string; 
    let typeMessage:NoticeType;
   await  ToDoTaskService.post(newTask)
    .then(function (response) {
      
      updateList(newTask);
      typeMessage = 'success'
      messageText = "Task successfully added :)"

    })
    .catch(function (error) {
      typeMessage="error";
      messageText = "Task wasn`t added :("
    })
    .finally(()=>{
      messageApi.open({
        duration: 2,
        type: typeMessage,
        content:messageText ,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
      setOpen(false);
    })
  }

  return (
    <div>
      
      <TaskCalendar toDoList={toDoList} handleOnClick={handleOnClick}/>
      {contextHolder}
      <Modal

        onCancel={()=>setOpenMoreModal(false)}
        open={openMoreModal}
        footer={[
        ]}>
          <Divider/>
        <TaskView handleUpdate={handleUpdate} saveEnable={false}  task={taskOnModal!} onCancel={()=>setOpenMoreModal(false)} onDelete={handleDelete}></TaskView>
      </Modal>

      <Tooltip title="Add">
        <Button onClick={()=>setOpen(true)} className="add-button" shape="circle" icon={<PlusOutlined />}  />
      </Tooltip>
        <Modal
            title="New Task"
            open={open}
            okText="Add"
            onCancel={handleCancel}
            footer ={[]}
        >
            <TaskForm  onAddClick={handleAdd} ></TaskForm>
        </Modal>
    </div>
  )
}