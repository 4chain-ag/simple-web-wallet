import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {defaultAdminKey, spvWalletURL} from "../constants.js";

const addPaymail = async (xpub, paymail, publicName) => {
    const client = new SpvWalletClient(spvWalletURL, {adminKey: defaultAdminKey})

    return await client.AdminCreatePaymail(xpub, paymail, publicName, "")
}

export default addPaymail;
