import {UndoProps} from "../Types";
import undo from "../UndoLogic";
import React, {KeyboardEventHandler} from "react";

export const UndoButton = (props: UndoProps) => {

    function clickHandler() {
        undo(props);
    }

    return <button id={'undoButton'} onClick={clickHandler}>⎌</button>;
}

