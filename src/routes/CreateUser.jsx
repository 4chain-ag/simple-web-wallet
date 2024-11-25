import {useState} from "react";
import { generateKeys } from '@bsv/spv-wallet-js-client'

export default function CreateUser() {
    const [keys, setKeys] = useState(null)

    const generateKeyPair = () => {
        const keys = generateKeys()
        setKeys({
            xPriv: keys.xPriv(),
            xPub: keys.xPub.toString(),
            mnemonic: keys.mnemonic
        })
    }

    return (
        <div>
            <h1>Create user</h1>
            <p>To create a user you will need a key pair. Let's generate one 🚀</p>

            <h4>Random your extended private key (xPriv) and matching public key (xPub):</h4>
            <button onClick={generateKeyPair}>Generate 🔑</button>

            {keys && (
                <div className="key-display">
                    <p><strong>xpriv:</strong> <span id="xpriv"></span></p>
                    <p><strong>xpub:</strong> <span id="xpub"></span></p>
                </div>
            )}
        </div>
    )
}
