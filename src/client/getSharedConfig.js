import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {defaultAdminKey, spvWalletURLAPI} from "../constants.js";

const getSharedConfig = async () => {
    const client = new SpvWalletClient(spvWalletURLAPI, {adminKey: defaultAdminKey})
    return await client.GetSharedConfig()
}

export default getSharedConfig;
