import { useState } from 'react';

const AddTask = ( {formData} ) => {

    const [text, setText] = useState('');
    const [desc, setDesc] = useState('');
    const [reminder, setReminder] = useState(false);

    return (
        <form className = 'form-control add-form' onSubmit = { (e) => {
            e.preventDefault();
            if(text.length === 0){
                alert("Type something!");
                return ;
            }
            formData( {text, desc, reminder} );
        }}>
            <div className = 'form-control'>
                <label>Task name</label>
                <input type = 'text' placeholder = "Task name" value = {text} onChange = { (e) => setText(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Task desc</label>
                <input type = 'text' placeholder = "Task description" value = {desc} onChange = { (e) => setDesc(e.target.value)}/>
            </div>
            <div className = 'form-control form-control-check'>
                <label >Reminder</label>
                <input className = 'form-control-check' type = 'checkbox' value = {reminder} onChange = 
                { (e) => setReminder( reminder ? false : true)}
                />
            </div>
            <input type = 'submit' value = 'Save Task' className = 'btn'/>
        </form>
    )
}

export default AddTask
