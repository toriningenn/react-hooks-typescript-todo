import React, {MouseEventHandler} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


const DeleteButton = (props: {deleteFunction: ()=>void}) => {

    return <button type="button" onClick={props.deleteFunction}>X</button>
}

export default DeleteButton;