import axios from 'axios';
import { TaskInterface, TaskInterfaceAdd } from '../ToDoTask/Interfaces/TaskInterface';


export class ToDoTaskService{
    public static url:string  = 'https://localhost:7096/api/v1/ToDoTask';
    public static post(task:TaskInterfaceAdd) {
        return axios.post(ToDoTaskService.url,task);
    }
    public static postUpdate(task:TaskInterface) {
        return axios.put(ToDoTaskService.url+"/update",task)
    }
    public static get(){
        return axios.get(ToDoTaskService.url)
    }
    public static deleteById(taskId:number){
        
        return axios.delete(ToDoTaskService.url+"?taskId="+taskId)
    }

}