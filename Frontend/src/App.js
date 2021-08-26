import { useState, useEffect } from "react"; // This are hooks
import { BrowserRouter as  Router, Route } from "react-router-dom"; 
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  // States are immutable and the only way to change them is to reinit from beginning.
  // tasks.push won't work
  // Do something like setTask([...tasks, {}]) instead

  useEffect(() => {
    const setData = async() => {
      const data = await fetchData();
      setTasks( data );
    }
    setData();
  })


  // Get tasks
  const fetchData = async () => {
    const res = await fetch('http://localhost:5000');
    const data = await res.json();
    return data;
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    })
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    await fetch(`http://localhost:5000/update/${id}`, {
      method: "PUT"
    })
  }


  // Delete for static data by updating states
  // const deleteTask = (id) => {
  //   setTasks( tasks.filter( (task) => (task.id !== id)));
  // }

  // Toggle reminder by updating states
  // const toggleReminder = (id) => {
  //   setTasks(tasks.map( (task) => (
  //     id === task.id ? ({...task, reminder: !task.reminder}) : task
  //   )));
  // }

  // Receive form data
  const formData = async (form) => {

    let data = await fetch('http://localhost:5000/add', {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(form)
    })

    let res = await data.json()
    console.log(res);

    // let size = tasks.length;
    // let nid = Math.floor(Math.random() * 10000 + size);
    // setTasks( [...tasks, {id: nid, ...form}] );
  }

  // Toggle form visibility
  const toggleForm = () => {
    setVisible( visible ? false : true);
  }

  return (
    <Router>
      <div className="container">
        
        <Header title = "Task Tracker" visible = {visible} toggleForm = {toggleForm}/>
        <Route path = '/' exact>
          {visible ? <AddTask formData = {formData}/> : ''}
          {tasks.length > 0 ? <Tasks tasks = {tasks} del = {deleteTask} toggle = {toggleReminder}/> : 'Empty list!'}
          <Footer />
        </Route>
        <Route path = '/about' component = {About}/>
      </div>
    </Router>
  );
}

export default App;
