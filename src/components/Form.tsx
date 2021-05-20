import React, {FormEvent} from 'react';
import {useState} from 'react';
import {Task} from "../Types";

const Form = (props: { addFunction: (task: Task) => void }) => {

    const [userInput, setUserInput] = useState("");

    function inputHandler(event: FormEvent<HTMLInputElement>) {
        setUserInput(event.currentTarget.value);
    };

    function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let newTask: Task = {statusString: "TASKTODO", task: userInput};
        props.addFunction(newTask);
        setUserInput("");
    }

    return <form onSubmit={submitHandler}>
        <label>New task:</label>
        <input autoComplete="off" type="text" onChange={inputHandler} value={userInput}/>
        <button type="submit">Submit</button>
    </form>;

}

export default Form;