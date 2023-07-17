import axios from 'axios';
import { TaskColorInterface } from '../ToDoTask/Interfaces/Color/TaskColorInterface';

export class ColorTaskService{
    public static url:string  = 'https://localhost:7096/api/v1/ToDoTaskColor';

    public static async getColors(){
       return await axios.get(this.url);

    }
    
}