const DisplayKeys = ({keys, title}) => {
    return (
        <div>
            <div className="key-display">
                <strong>{title}:</strong>
                <p><strong>xpriv:</strong> {keys.xPriv}</p>
                <p><strong>xpub:</strong> {keys.xPub}</p>
                <p><strong>mnemonic:</strong> {keys.mnemonic}</p>
            </div>
        </div>
    )
}

export default DisplayKeys;
