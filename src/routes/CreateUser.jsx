import {useState} from "react";
import {generateKeys, getKeysFromMnemonic} from '@bsv/spv-wallet-js-client'
import JsonResponseDisplay from "../components/JsonResponseDisplay.jsx";
import getSharedConfig from "../client/getSharedConfig.js";
import addXPub from "../client/addXPub.js";
import addPaymail from "../client/addPaymail.js";
import DisplayKeys from "../components/DisplayKeys.jsx";

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
            <p>Creating a user consists of several steps:</p>
            <ul>
                <li>Generate a key pair (xPriv and xPub)</li>
                <li>Save the xPub in the SPV wallet system</li>
                <li>Attach at least one paymail address to the xPub</li>
            </ul>

            <h4>Random your extended private key (xPriv) and matching public key (xPub):</h4>
            <button onClick={generateKeyPair}>Generate 🔑</button>

            {keys && (
                <div>
                    <DisplayKeys keys={keys} title={"Generated keys"}/>

                    <MnemonicExample/>
                </div>
            )}

            <AddXPub/>
        </div>
    )
}

function MnemonicExample() {
    const [keys, setKeys] = useState(null)
    const [mnemonic, setMnemonic] = useState("")

    const getXPrivFromMnemonic = () => {
        try {
            const keys = getKeysFromMnemonic(mnemonic)
            setKeys({
                xPriv: keys.xPriv(),
                xPub: keys.xPub.toString(),
                mnemonic: keys.mnemonic
            })
        } catch (e) {
            console.error(e)
            alert("Invalid mnemonic")
        }
    }

    return (
        <>
            <h4>About the Mnemonics</h4>
            <p>
                As you can see, besides the "key pair" (xPriv and xPub), the <strong>Mnemonic</strong> is also
                generated. <br/>
                It is a human-readable representation of your private key and is used to recover your wallet.
            </p>

            <p>Try to copy-paste the generated mnemonic and check if the output aligns with the generated one</p>
            <input
                type="text"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder={"Enter your mnemonic here"}
            />
            <button onClick={getXPrivFromMnemonic}>Recover your 🔑</button>

            {keys && <DisplayKeys keys={keys} title={"Recovered keys"}/>}
        </>
    )
}

function AddXPub() {
    const [xPub, setXPub] = useState("")
    const [xPubObj, setXPubObj] = useState(null)

    const onClick = async () => {
        try {
            const response = await addXPub(xPub)
            setXPubObj(response)
        } catch (e) {
            console.error(e)
            alert("Cannot add xPub")
        }
    }

    return (
        <div>
            <h2>Add an xPub to `spv-wallet`</h2>
            <p>Because of `spv-wallet` is a <strong>non custodial wallet</strong> private keys are not stored in its
                database</p>
            <p>It only relies on client's xPubs what keeps it less vulnerable for attacks.</p>

            <div className="note">
                <p>
                    💡 Note: To add an xPub to the `spv-wallet` you need to have an <strong>admin key</strong> which is
                    used to manage the wallet.
                </p>
            </div>

            <p>Enter your xPub below:</p>
            <input
                type="text"
                value={xPub}
                onChange={(e) => setXPub(e.target.value)}
                placeholder={"Enter your xPub here"}
            />
            <button onClick={onClick}>Add xPub</button>

            {xPubObj && (
                <>
                    <h3>Successfully added xpub to spv-wallet</h3>
                    <JsonResponseDisplay data={xPubObj}/>

                    <AddPaymail xpub={xPub}/>
                </>
            )}
        </div>
    )
}

function AddPaymail({xpub}) {
    const [paymail, setPaymail] = useState("")
    const [publicName, setPublicName] = useState("")
    const [paymailObject, setPaymailObject] = useState(null)

    const onClick = async () => {
        try {
            const response = await addPaymail(xpub, paymail, publicName)
            setPaymailObject(response)
        } catch (e) {
            console.error(e)
            alert("Cannot add xPub")
        }
    }

    return (
        <div>
            <h2>Add a paymail to `spv-wallet`</h2>

            <p>The main transaction flow in spv-wallet is based on `paymail` that simplifies sending funds between
                parties.</p>

            <p>After adding the xPub, the next step is to add your paymail</p>

            <p>You can provide whatever you want alias but the domain should be one of the supported by current
                installation of spv-wallet</p>

            <GetSharedConfig xPub={xpub}/>

            <p>Enter your paymail below:</p>
            <input
                type="text"
                value={paymail}
                onChange={(e) => setPaymail(e.target.value)}
                placeholder={"Enter your paymail here"}
            />
            <p>Enter a Public Name</p>
            <input
                type="text"
                value={publicName}
                onChange={(e) => setPublicName(e.target.value)}
                placeholder={"Enter your public name here"}
            />
            <button onClick={onClick}>Add paymail</button>

            {paymailObject && (
                <>
                    <h3>Successfully added xpub to spv-wallet</h3>
                    <JsonResponseDisplay data={paymailObject}/>
                </>
            )}
        </div>
    )
}

function GetSharedConfig({xPub}) {
    const [config, setConfig] = useState(null)

    const onClick = async () => {
        try {
            setConfig(await getSharedConfig(xPub))
        } catch (e) {
            console.error(e)
            alert("Cannot get shared config")
        }
    }

    return <>
        <h5>Get shared config</h5>

        <p>Get shared config is a method that allows you to get the shared configuration of the wallet</p>
        <p>For this part, you should check the supported domains</p>

        <button onClick={onClick}>Get shared config</button>

        {config != null && <JsonResponseDisplay data={config}/>}
    </>
}

