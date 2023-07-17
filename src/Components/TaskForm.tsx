import React, { useState }  from "react";
import TextArea from "antd/es/input/TextArea";
import { Badge, Button, DatePicker, Form,  Input,  Select } from "antd";
import {  TaskColors } from "../ToDoTask/Interfaces/Color/TaskColorInterface";
import { STATUSES } from "../ToDoTask/Interfaces/TaskInterface";
export const TaskForm: React.FC<{ onAddClick: Function }>
    = (props) => {
        const [form] = Form.useForm(undefined);
        if(form!=null){
            form.resetFields();
        }

    
        const [addLoading,setAddLoading] = useState<boolean>(false);

        console.log("addform");
        const onFinish = (values: any) => {
            setAddLoading(true);
            let newTask = {
                ...values,
                status: STATUSES.findIndex(s=>s.value=== values.status),
                dateTime: values.dateTime.format('YYYY-MM-DD')
            }
            props.onAddClick(newTask);
            setAddLoading(false);
            form.resetFields();
            
            
          };
          
          const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
          };

        

        return  <Form className="new-task-modal-form" labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}

        form={form}
      
    >
        <Form.Item className="new-task-modal-form-item"
            name={"title"}
            rules={[{ required: true, message: 'Please input title!' }]} label="Title">
            <Input className="new-task-modal-form-input" />
        </Form.Item>

        <Form.Item name={"taskColorId"} rules={[{ required: true, message: 'Please select color!' }]} label="Color" >
            <Select   >
                {TaskColors.COLORS.map(c => <Select.Option value={c.id}>
                    <Badge color={c.colorString} text={c.name} />
                </Select.Option>)}
            </Select>
        </Form.Item>

        <Form.Item name={"status"} rules={[{ required: true, message: 'Please select status!' }]} label="Status">
            <Select >
                {STATUSES.map(s => <Select.Option value={s.value}>
                    {s.value}
                </Select.Option>)}
            </Select>
        </Form.Item>

        <Form.Item name={"dateTime"} rules={[{ required: true, message: 'Please chose date!' }]} label="Task date">
            <DatePicker />
        </Form.Item>
        <Form.Item name={"place"} label="Place">
            <Input maxLength={50} />
        </Form.Item>

        <Form.Item name={"description"} label="Description">
            <TextArea rows={4} cols={40} placeholder={"Enter the description of event"} maxLength={255}
            />
        </Form.Item >
        <Form.Item wrapperCol={{ offset: 10, span: 12 }} >        
            <Button type="primary" htmlType="submit" loading={addLoading} > Add</Button>
        </Form.Item>
    </Form>
    }