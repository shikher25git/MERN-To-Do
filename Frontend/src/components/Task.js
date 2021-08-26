import { FaTimes } from 'react-icons/fa';

const Task = ( {task, del, toggle} ) => {
    return (
        // Backticks are used because className is dynamic
        <div className = {`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick = { () => {toggle(task._id)}}>  
            <h3>{ task.text } <FaTimes style = {{ color: 'red'}} onClick = { () => del(task._id)} /></h3>
            <p>{ task.desc }</p>
        </div>
    )
}

export default Task
