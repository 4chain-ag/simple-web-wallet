import {NavLink} from "react-router";
import ConnectionChecker from "../components/ConnectionChecker.jsx";


export default function Home() {
    return (
        <div>
            <h1><ConnectionChecker/> Welcome to the Bitcoin SV Workshop 🚀</h1>

            <p>This React app is your starting point for hands-on exercises during the Bitcoin Satoshi Vision (BSV)
                workshops. Explore the power of Bitcoin SV as you work through the provided tools and features.</p>

            <h2>Here's how to get started:</h2>

            <h3><NavLink to={'/create-user'}>/create-user</NavLink></h3>
            <ul>
                <li><strong>Generate Key Pair</strong>: Create your secure Bitcoin private/public key pair.</li>
                <li><strong>Register Your Wallet</strong>: Save your <strong>xpub</strong> (extended public key) and
                    your <strong>paymail</strong> into the SPV wallet system for seamless interaction.
                </li>
            </ul>

            <h3><NavLink to={'/wallet'}>/wallet</NavLink></h3>
            <ul>
                <li>Input your <strong>xpriv</strong> (extended private key) generated during registration.</li>
                <li>Unlock the wallet view and explore transaction details, balances, and more.</li>
            </ul>

            <div className="note">
                <h3>💡 Note</h3>
                <p>
                    This page is created <strong>exclusively for workshop exercises</strong>. It is intended
                    for <strong>educational
                    purposes only</strong> and should <strong>not be used for production or storing real funds</strong>.
                </p>
            </div>
        </div>
    )
}
