const Cell = ({details}) => {
    const cellStyle = {
        width: 40, height: 40, background: "lightgrey",
        borderWidth: 3, borderStyle: "outset", display: "flex",
        justifyContent: "center", alignItems: "center", cursor: "pointer"
    }
    return (
        <div style={cellStyle}>
            {details.value}
        </div>
    );
}

export default Cell;