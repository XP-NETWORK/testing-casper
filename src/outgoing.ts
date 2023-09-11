import { exit } from 'process';
import { error, log } from "console";
import BigNumber from "bignumber.js";
import {
    Casper,
    CasperHelper,
    getAccountRawHash,
    getFactory,
    OtherChain
} from "./setup";
import { config } from 'dotenv';
config();

(async () => {

    const casper = await Casper();
    const factory = await getFactory();
    const helper = CasperHelper;
    const { chain } = await OtherChain("MOONBEAM");

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
        chain as any,
        selected,
        helper,
        process.env.EVM_PK!
    );

    log("Transfer:", transfer);

    exit(0);
})().catch(e => {
    error(e);
    exit(1);
})