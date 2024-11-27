import {useCallback, useEffect, useState} from "react";
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {spvWalletURL, spvWalletURLAPI} from "../constants.js";
import JsonResponseDisplay from "../components/JsonResponseDisplay.jsx";

export default function Wallet() {
    const [xPrivInput, setXPrivInput] = useState("")
    const [xPriv, setXPriv] = useState(null)

    return (
        <>
            {!xPriv ? (
                <>
                    <h4>To login as a user, provide your xPriv</h4>
                    <input
                        type="text"
                        value={xPrivInput}
                        onChange={(e) => setXPrivInput(e.target.value)}
                        placeholder={"Enter your xPriv here"}
                    />
                    <button onClick={() => setXPriv(xPrivInput)}>Go to your wallet</button>
                </>
            ) : <WalletPage xPriv={xPriv} />}
        </>
    )
}

function WalletPage({xPriv}) {
    const [userInfo, setUserInfo] = useState(null)
    const [transactions, setTransactions] = useState([])

    const refresh = useCallback(async () => {
        const getUserInfo = async () => {
            try {
                const client = new SpvWalletClient(spvWalletURL, { xPriv })

                const resp = await client.GetUserInfo()
                setUserInfo(resp)
            }catch (e) {
                console.error(e)
                alert("Invalid xPriv")
            }
        }

        const getTransactions = async () => {
            const client = new SpvWalletClient(spvWalletURL, {xPriv})

            const txs = await client.GetTransactions({}, {}, {
                page: 1,
                pageSize: 10,
            })

            setTransactions(txs.content)
        }

        await Promise.all([getUserInfo(), getTransactions()])
    }, [])

    useEffect(() => {
        refresh().then(() => console.log("Refreshed"))
    }, [refresh]);

    if(!userInfo) {
        return null
    }

    return (
        <>
            <button onClick={refresh}>Refresh</button>
            <h1>Hello</h1>
            <h4>User info</h4>
            <JsonResponseDisplay data={userInfo} title={"User info"}/>

            <SendTransaction xPriv={xPriv} refresh={refresh}/>

            <h4>Transactions</h4>
            {transactions.map((tx) => (
                <JsonResponseDisplay data={tx} title={"Transaction"}/>
            ))}
        </>
    )
}

function SendTransaction({xPriv, refresh}) {
    const [recipient, setRecipient] = useState("")
    const [amount, setAmount] = useState(0)
    const [newTxObject, setNewTxObject] = useState(null)

    const sendTransaction = async () => {
        try {
            const client = new SpvWalletClient(spvWalletURL, { xPriv })

            const newTransaction = await client.SendToRecipients(
                {
                    outputs: [
                        {
                            to: recipient,
                            satoshis: amount,
                        }
                    ]
                },
                {  },
            );

            setNewTxObject(newTransaction)
            refresh()
        }catch (e) {
            console.error(e)
            alert("Cannot send transaction")
        }
    }

    return (
        <>
            <h4>Send transaction</h4>
            <input
                type="text"
                placeholder="Recipient paymail"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
            />
            <button onClick={sendTransaction}>Send</button>

            {newTxObject && <>
                <JsonResponseDisplay data={newTxObject} title={"New transaction"}/>

                <a href={"https://whatsonchain.com/tx/" + newTxObject.id} target="_blank" rel="noreferrer">
                    View transaction on whatsonchain
                </a>
            </>}


        </>
    )
}
