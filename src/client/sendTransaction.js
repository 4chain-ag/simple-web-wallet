import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {spvWalletURL} from "../constants.js";

const sendTransaction = async (xPriv, recipient, amount) => {
    const client = new SpvWalletClient(spvWalletURL, {xPriv})

    return await client.SendToRecipients(
        {
            outputs: [
                {
                    to: recipient,
                    satoshis: amount,
                }
            ]
        },
        {},
    );
}

export default sendTransaction;
