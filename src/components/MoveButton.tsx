import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {TaskStatus} from "./Types";

const MoveButton = (props: {moveFunction: ()=>void, done: boolean}) => {
    function buttonLook() {
        return props.done? "↑": "✓";
    }
    return <div><button onClick={props.moveFunction}>{buttonLook()}</button></div>
}

 export default MoveButton;