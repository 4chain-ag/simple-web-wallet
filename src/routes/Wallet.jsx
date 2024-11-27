import {useCallback, useEffect, useState} from "react";
import JsonResponseDisplay from "../components/JsonResponseDisplay.jsx";
import getUserInfo from "../client/getUserInfo.jsx";
import getTransactions from "../client/getTransactions.jsx";
import sendTransaction from "../client/sendTransaction.jsx";

export default function Wallet() {
    const [xPrivInput, setXPrivInput] = useState("")
    const [xPriv, setXPriv] = useState(null)

    const reset = () => {
        setXPriv(null)
        setXPrivInput("")
    }

    return <>
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
        ) : <WalletPage xPriv={xPriv} reset={reset}/>}
    </>
}

function WalletPage({xPriv, reset}) {
    const [userInfo, setUserInfo] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)

    const refresh = useCallback(async () => {
        try {
            setLoading(true)
            setUserInfo(await getUserInfo(xPriv))
            setTransactions(await getTransactions(xPriv))
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        refresh().then(() => console.log("Refreshed"))
    }, [refresh]);

    if (!userInfo && !loading) {
        return <>
            <p>Cannot fetch user info - post probably wrong xPriv has been provided.</p>
            <button onClick={reset}>Go back</button>
        </>
    }

    return (
        <>
            <button
                onClick={refresh}
                disabled={loading}
            >
                {loading ? "Refreshing..." : "Refresh"}
            </button>
            <h1>Hello</h1>
            <h3>User info</h3>
            <JsonResponseDisplay data={userInfo} title={"User info"}/>

            <SendTransaction xPriv={xPriv} refresh={refresh}/>

            <h3>Transactions</h3>
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
    const [sending, setSending] = useState(false)

    const onClick = async () => {
        try {
            setSending(true)
            setNewTxObject(null)
            const response = await sendTransaction(xPriv, recipient, amount)

            setNewTxObject(response)
            refresh()
        } catch (e) {
            console.error(e)
            alert("Cannot send transaction")
        } finally {
            setSending(false)
        }
    }

    return <>
        <h3>Send transaction</h3>
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
        <button
            onClick={onClick}
            disabled={sending || !recipient || !amount}
        >
            {sending ? "Sending..." : "Send"}
        </button>

        {newTxObject && <>
            <h4>Transaction has been sent</h4>
            <JsonResponseDisplay data={newTxObject} title={"New transaction"}/>

            <a href={"https://whatsonchain.com/tx/" + newTxObject.id} target="_blank" rel="noreferrer">
                View transaction on whatsonchain
            </a>
        </>}
    </>
}
