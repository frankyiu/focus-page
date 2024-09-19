import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "./Todo.css";
import { useState } from "react";
import { FiDelete } from "react-icons/fi";


function Todo() {
    type Task = {
        isCompleted: boolean;
        str: string;
    };

    const [tasks, setTasks] = useState<Task[]>([]);
    const [curTask, setCurTask] = useState<string>("");

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (curTask.trim()) {
            setTasks([...tasks, { isCompleted: false, str: curTask }]);
            setCurTask("");
        }
    };

    const handleCheckboxChange = (index: number) => {
        const tasksCopy = [...tasks]
        tasksCopy[index].isCompleted = !tasksCopy[index].isCompleted
        setTasks(tasksCopy)
    }

    const removeTask = (index: number) => {
        const tasksCopy = [...tasks]
        tasksCopy.splice(index, 1)
        setTasks(tasksCopy)
    }

    return (
        <div className="Todo">
            <h4 className="mb-3 ">Todo List</h4>
            <Form onSubmit={addTask}>
                <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
                    <Form.Control
                        type="text"
                        id="input-task"
                        placeholder="What do you want to do Today"
                        value={curTask}
                        onChange={(e) => {
                            setCurTask(e.target.value);
                        }}
                    />
                    <Button variant="outline-light" type="submit">
                        Add
                    </Button>
                </div>
            </Form>
            <div>
                {tasks.map((task, index) => (
                    <div className="d-flex align-items-center gap-3 " key={index}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={()=>handleCheckboxChange(index)}
                        />
                        <div className={task.isCompleted ? "crossout" : ""}>
                            {task.str}
                        </div>
                        <FiDelete className='ms-auto cursor-pointer me-2' onClick={()=>removeTask(index)}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;
