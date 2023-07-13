import {exit} from 'process';
import { error, log } from "console";
import BigNumber from "bignumber.js";
import {
    Casper, 
    getFactory, 
    OtherChain
} from "./setup";
import {config} from 'dotenv';
config();

(async () => {

    const casper = await Casper();
    const factory = await getFactory();
    const {chain, signer} = await OtherChain("MOONBEAM");
    const EVM_PK = process.env.EVM_PK!
    const casper_PK = process.env.PK!;

    const NFTs = await factory.nftList(
        chain,
        EVM_PK
    )

    const selected = NFTs[2]

    log(selected)
    
    const approval = await chain.preTransfer(
        signer,
        selected,
        new BigNumber(0)
    );

    log("Approval:", approval);

    const transfer = await factory.transferNft(
        chain as any,
        casper,
        selected,
        signer,
        casper_PK
    );

    log("Transfer:", transfer);

    exit(0);
})().catch(e => {
    error(e);
    exit(1);
})