import Task from "./Task"

const Tasks = ( {tasks, del, toggle} ) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key = {task._id} task = { task } del = {del} toggle = {toggle}/>
            ))}
        </>
    )
}

export default Tasks
