import {useEffect, useState} from "react";
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";
import {defaultAdminKey, spvWalletURL} from "../constants.js";

const ConnectionChecker = () => {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        const check = async () => {
            try {
                const client = new SpvWalletClient(spvWalletURL, {adminKey: defaultAdminKey})
                const response = await client.AdminGetStats()
                setIsOnline(response != null)
            }catch (e){
                setIsOnline(false)
            }
        }

        check().then(() => console.log('checked'))
    }, []);

    if (isOnline === null){
        return <>⚪</>
    }

    return <>{isOnline ? '🟢' : '🔴'}</>
}

export default ConnectionChecker;
