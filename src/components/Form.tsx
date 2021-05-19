import React, {FormEvent} from 'react';
import {useState} from 'react';
import {Task} from "./Types";

const Form = (props: { addFunction: (task: Task) => void }) => {

    const [userInput, setUserInput] = useState("");

    function inputHandler(event: FormEvent<HTMLInputElement>) {
        setUserInput(event.currentTarget.value);
    };

    function submitHandler(event: FormEvent<HTMLFormElement>) {
        let newTask: Task = {statusString: "TASKTODO", task: userInput};
        props.addFunction(newTask);
    }

    return <div>
        <form onSubmit={submitHandler}>
            <label>New task:</label>
            <input autoComplete="off" type="text" onChange={inputHandler}/>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default Form;