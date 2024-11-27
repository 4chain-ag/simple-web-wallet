import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {defaultAdminKey, spvWalletURL} from "../constants.js";

const addXPub = async (xPub) => {
    const client = new SpvWalletClient(spvWalletURL, {adminKey: defaultAdminKey})
    return await client.AdminNewXpub(xPub, {})
}

export default addXPub;
