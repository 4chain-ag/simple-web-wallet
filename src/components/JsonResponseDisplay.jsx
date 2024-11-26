const JsonResponseDisplay = ({data}) => {
    return (
        <pre style={styles.jsonBlock}>
            {data ? JSON.stringify(data, null, 2) : "No data available"}
        </pre>
    );
};

const styles = {
    jsonBlock: {
        margin: "10px 0",
        backgroundColor: "#eef6ff",
        color: "#333",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #91caff",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        maxHeight: "300px",
        overflowY: "auto",
    },
};

export default JsonResponseDisplay;
