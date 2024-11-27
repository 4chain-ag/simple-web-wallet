import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {spvWalletURL} from "../constants.js";

const sendOpReturnTx = async (xPriv, data) => {
    const client = new SpvWalletClient(spvWalletURL, {xPriv})

    const draftTransaction = await client.NewDraftTransaction(
        {
            outputs: [
                {
                    opReturn: {
                        stringParts: [data],
                    },
                },
            ],
        },
        {}
    );

    const finalized = await client.SignTransaction(draftTransaction);
    return await client.RecordTransaction(finalized, draftTransaction.id, {});
}

export default sendOpReturnTx;
