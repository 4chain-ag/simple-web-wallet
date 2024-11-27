import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {spvWalletURL} from "../constants.js";

const getUserInfo = async (xPriv) => {
    const client = new SpvWalletClient(spvWalletURL, {xPriv})

    return await client.GetUserInfo()
}

export default getUserInfo;
