import { TaskCalendarTab } from '../ToDoTask/TaskCalendarTab';
import { TaskColors } from '../ToDoTask/Interfaces/Color/TaskColorInterface';
export const MainComponent: React.FC = () => {
    TaskColors.initializeColor();
    return (
        <div className='mainComponent'>
           <TaskCalendarTab ></TaskCalendarTab>
        </div>
    )
}