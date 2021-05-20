const MoveButton = (props: { moveFunction: () => void, done: boolean }) => {
    function buttonLook() {
        return props.done ? "↑" : "✓";
    }
    return <button onClick={props.moveFunction}>{buttonLook()}</button>;
}

export default MoveButton;