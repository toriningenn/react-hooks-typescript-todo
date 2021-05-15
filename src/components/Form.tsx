import React, {FormEvent, FormEventHandler} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {Task} from "./Types";

const Form = (props: { addFunction: (task: Task) => void }) => {

 const [userInput,setUserInput] = useState("");

    function inputHandler (event: FormEvent<HTMLInputElement>){
        setUserInput(event.currentTarget.value);
    };
    function submitHandler(event: FormEvent<HTMLFormElement>) {
        let newTask: Task ={statusString:"TASKTODO",task: userInput};
        props.addFunction(newTask);
    }

    return <div>
        <form onSubmit={submitHandler}>
            <label htmlFor="newTask">New task:</label>
            <input id="newTask" name="newTask" type="text" onChange={inputHandler}/>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default Form;