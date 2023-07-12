import {exit} from 'process';
import { error, log } from "console";
import BigNumber from "bignumber.js";
import {
    Casper, 
    CasperHelper, 
    getAccountRawHash, 
    getFactory, 
    Moonbeam
} from "./setup";

(async () => {

    const casper = await Casper();
    const factory = await getFactory();
    const helper = CasperHelper;
    const moonbeam = await Moonbeam();

    const NFTs = await factory.nftList(
        casper,
        await getAccountRawHash()
    )

    const selected = NFTs[0]

    log(selected)
    
    const approval = await casper.preTransfer(
        helper,
        selected,
        // @ts-ignore
        new BigNumber(0)
    );

    log("Approval:", approval);

    const transfer = await factory.transferNft(
        casper,
        moonbeam as any,
        selected,
        helper,
        "0x0d7df42014064a163DfDA404253fa9f6883b9187"
    );

    log("Transfer:", transfer);

    exit(0);
})().catch(e => {
    error(e);
    exit(1);
})