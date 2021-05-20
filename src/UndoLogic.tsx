import {undoProps} from "./Types";
import React from "react";

const undo = ({
                  lastActionType, lastDeleted,
                  lastMoved, lastAdded,
                  moveFunc, addFunc,
                  deleteFunc,
                  doneArr, todoArr
              }: undoProps) => {
        switch (lastActionType) {
            case "DELETE":
                addFunc(lastDeleted);
                break;
            case "MOVE": {
                switch (lastMoved.statusString) {
                    case "TASKTODO":
                        moveFunc(todoArr.indexOf(lastMoved), lastMoved.statusString)
                        break;
                    case "DONE":
                        moveFunc(doneArr.indexOf(lastMoved), lastMoved.statusString)
                        break;
                }
                break;
            }
            case "ADD":
                if (todoArr.indexOf(lastAdded))
                    deleteFunc(todoArr.indexOf(lastAdded), "TASKTODO");
                break;
            case "":
                break;
        }
    }
;


export default undo;