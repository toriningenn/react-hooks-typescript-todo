import {undoProps} from "../Types";
import undo from "../UndoLogic";
import React, {KeyboardEventHandler} from "react";

export const UndoButton = (props: undoProps) => {

    function clickHandler() {
        undo(props);
    }

    return <button id={'undoButton'} onClick={clickHandler}>⎌</button>;
}

