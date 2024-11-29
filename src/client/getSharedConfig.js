import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {spvWalletURL} from "../constants.js";

const getSharedConfig = async (xPub) => {
    const client = new SpvWalletClient(spvWalletURL, {xPub})
    return await client.GetSharedConfig()
}

export default getSharedConfig;
