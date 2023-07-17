export interface TaskInterface{
    id:number;
    title:string;
    description?:string;
    taskColorId:number;
    place?:string;
    status:ToDoTaskStatus;
    dateTime?:Date 
} 
export interface TaskInterfaceAdd{
    title:string;
    description?:string;
    taskColorId:number;
    place?:string;
    status:ToDoTaskStatus;
    dateTime?:Date 
} 
export enum ToDoTaskStatus
{
    New,
    InProgress,
    Done

}
export const STATUSES: { value: string; }[] = Object.values(ToDoTaskStatus)
        .filter((value) => typeof value === "string")
        .map((value) => ({ value: value as string }));