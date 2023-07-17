import { Badge, Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
import { TaskColors } from "../ToDoTask/Interfaces/Color/TaskColorInterface";
import { STATUSES, TaskInterface } from "../ToDoTask/Interfaces/TaskInterface";
import { Dialog, DialogContentText } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


export const TaskView: React.FC<{ task: TaskInterface, onCancel:Function, onDelete:Function,handleUpdate:Function,saveEnable:boolean }>
    = (props) => {
        const [dialogOpened,setDialogOpen] = useState<boolean>(false);
        const [saveLoading, setSaveLoading] = useState<boolean>(false);
        const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
        const [saveEnabled,setSaveEnabled] = useState<boolean>(false);
        const updated = useRef<boolean>(false);

        
        const onFinish = (values: any) => {
            setSaveLoading(true);
            let updatedTask =
            {id: props.task.id,
                title: values.title,
                status:STATUSES.findIndex(s=>s.value=== values.status),
                taskColorId:values.color,
                description:values.description,
                place: values.place,
                dateTime: values.dateTime.format('YYYY-MM-DDTHH:mm:ss[Z]')
            }
            props.handleUpdate(updatedTask);
            setSaveLoading(false);
            setSaveEnabled(false);
        };
        useEffect(()=>{
          setSaveEnabled(false);
         },[props.task])

        const onItemChanged= ()=>{
            if(!saveEnabled){
                setSaveEnabled(true);
            } 
        }

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        const handleAgree = async () =>{
            handleCloseDialog()
            setDeleteLoading(true);
            props.onDelete();
            setDeleteLoading(false);
        }
   
        const [form] = Form.useForm();

        form.setFieldsValue({
            title: props.task.title,
            color: props.task.taskColorId,
            status: STATUSES[props.task.status].value,
            dateTime: dayjs(props.task.dateTime),
            place: props.task.place,
            description: props.task.description,

        });

        const handleCloseDialog = () =>{
            setDialogOpen(false)
        }
        const handleOpenDialog = () =>{
            setDialogOpen(true)
        }


        
        console.log("redinring view")
        return (<>
            <Form className="new-task-modal-form" labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item className="new-task-modal-form-item"
                    name={"title"}
                    rules={[{ required: true, message: 'Please input title!' }]} label="Title" >
                    <Input className="new-task-modal-form-input" onChange={onItemChanged}/>
                </Form.Item>

                <Form.Item name={"color"} rules={[{ required: true, message: 'Please select color!' }]} label="Color" >
                    <Select  onChange={onItemChanged}  >
                        {TaskColors.COLORS.map(c => <Select.Option value={c.id}>
                            <Badge color={c.colorString} text={c.name} />
                        </Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item name={"status"} rules={[{ required: true, message: 'Please select status!' }]} label="Status">
                    <Select   onChange={onItemChanged}>
                        {STATUSES.map(s => <Select.Option value={s.value}>
                            {s.value}
                        </Select.Option>)}
                    </Select>
                </Form.Item>

                <Form.Item name={"dateTime"} rules={[{ required: true, message: 'Please chose date!' }]} label="Task date">
                    <DatePicker  onChange={onItemChanged} />
                </Form.Item>
                <Form.Item name={"place"} label="Place">
                    <Input maxLength={50}  onChange={onItemChanged} />
                </Form.Item>

                <Form.Item name={"description"} label="Description">
                    <TextArea rows={4} cols={40} placeholder={"Enter the description of event"} maxLength={255}
 onChange={onItemChanged} 
                    />
                </Form.Item >
                <Form.Item wrapperCol={{ offset: 10, span: 12 }} >
                    
                    <Button key="back" onClick={()=>{setSaveEnabled(false); props.onCancel()}}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOpenDialog} loading={deleteLoading}>
                        Delete
                    </Button>,
                    <Button type="primary" htmlType="submit" loading ={saveLoading} disabled={!saveEnabled} >
                         Save
                    </Button>

                </Form.Item>
            </Form>
          
      
            <Dialog
        open={dialogOpened}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      
        </>)
    }