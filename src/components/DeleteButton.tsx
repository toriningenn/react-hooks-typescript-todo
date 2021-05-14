import React, {MouseEventHandler} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


const DeleteButton = (props: {deleteFunction: ()=>void}) => {
    function deleteHandler () {
        props.deleteFunction();
    }
    return <button type="button" onClick={deleteHandler}>X</button>
}

export default DeleteButton;