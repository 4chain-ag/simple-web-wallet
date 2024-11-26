import {useState} from "react";
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {spvWalletURL} from "../constants.js";
import JsonResponseDisplay from "../components/JsonResponseDisplay.jsx";

export default function Wallet() {
    const [xPrivInput, setXPrivInput] = useState("")
    const [userInfo, setUserInfo] = useState(null)
    const [xPriv, setXPriv] = useState(null)

    const checkAccess = async () => {
        try {
            const client = new SpvWalletClient(spvWalletURL, { xPriv: xPrivInput })

            const resp = await client.GetUserInfo()
            setUserInfo(resp)
            setXPriv(xPrivInput)
        }catch (e) {
            console.error(e)
            alert("Invalid xPriv")
        }
    }

    return (
        <>
            {!userInfo ? (
                <>
                    <h4>To login as a user, provide your xPriv</h4>
                    <input
                        type="text"
                        value={xPrivInput}
                        onChange={(e) => setXPrivInput(e.target.value)}
                        placeholder={"Enter your xPriv here"}
                    />
                    <button onClick={checkAccess}>Go to your wallet</button>
                </>
            ) : <WalletPage xPriv={xPriv} userInfo={userInfo}/>}
        </>
    )
}

function WalletPage({xPriv, userInfo}) {
    return (
        <>
            <h1>Hello</h1>
            <h4>User info</h4>
            <JsonResponseDisplay data={userInfo} title={"User info"}/>

            <SendTransaction/>

            <TransactionsList/>
        </>
    )
}

function SendTransaction() {
    return (
        <>
            <h4>Send transaction</h4>
            <input type="text" placeholder="Recipient paymail"/>
            <input type="number" placeholder="Amount"/>
            <button>Send</button>
        </>
    )
}

function TransactionsList() {
    return (
        <>
            <h4>Transactions</h4>
            <JsonResponseDisplay data={[]} title={"Transactions"}/>
        </>
    )
}
