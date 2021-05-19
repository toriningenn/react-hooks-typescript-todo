const DeleteButton = (props: {deleteFunction: ()=>void}) => {

    return <button type="button" onClick={props.deleteFunction}>X</button>
}

export default DeleteButton;