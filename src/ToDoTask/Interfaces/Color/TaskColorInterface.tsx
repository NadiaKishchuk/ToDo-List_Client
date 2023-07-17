import { ColorTaskService } from "../../../Services/ColorTaskService";

export interface TaskColorInterface{
    id:number;
    name:string;
    colorString:string;
} 
export class TaskColors{
    static COLORS: TaskColorInterface[]=[];
    static initializeColor():void{
        if (this.COLORS.length===0)
        {
             ColorTaskService.getColors().then(
                responce=>{
                    console.log(responce.data);
                    this.COLORS = responce.data;
                }
             ).catch(err=>console.log(err))
            console.log(this.COLORS);
        }
    }

    static getColor(colorId:number):string{
        this.initializeColor();
    
        return this.COLORS.find(c=>c.id===colorId)?.colorString|| "#000000";
    }
}
