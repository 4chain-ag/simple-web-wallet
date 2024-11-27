import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {spvWalletURL} from "../constants.js";

const getTransactions = async (xPriv) => {
    const client = new SpvWalletClient(spvWalletURL, {xPriv})

    const response = await client.GetTransactions({}, {}, {
        page: 1,
        pageSize: 10,
    })

    return response.content
}

export default getTransactions;
