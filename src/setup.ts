import { CLPublicKey, Keys } from "casper-js-sdk";
import { ethers } from 'ethers';
import { env } from 'process';
import {config} from 'dotenv';
import {chainToRpc} from './utils';
import { AppConfigs, Chain, ChainFactory, ChainFactoryConfigs, MainNetRpcUri, TestNetRpcUri } from "xp.network";
import { CasperHelperFromKeys } from "xp.network/dist/helpers/casper";
config();

export type NETWORK = "testnet" | "mainnet";

export const getSigner = (): Buffer => {
    return Keys.Secp256K1.parsePrivateKey(Buffer.from(env.SK!,"base64"));
}

export const getPublicKey = () => {
    return Keys.Secp256K1.privateToPublicKey(getSigner());
}

export const getKeys = (): Keys.AsymmetricKey => {
    return Keys.Secp256K1.parseKeyPair(getPublicKey(), getSigner(), "raw");
}

export const getFactory = async () => {

    const network: NETWORK = env.NETWORK! as NETWORK;
    let factory;

    if(network == "testnet"){
        factory = ChainFactory(
            AppConfigs.TestNet(),
            await ChainFactoryConfigs.TestNet()
        );
    }else{
        factory = ChainFactory(
            AppConfigs.MainNet(),
            await ChainFactoryConfigs.MainNet()
        );
    }

    return factory;
}

// @ts-ignore
export const CasperHelper = CasperHelperFromKeys(getKeys());

export const Casper = async () => {
    return await (await getFactory()).inner(Chain.CASPER);
}

export const getEVMSigner = (rpc:string) => {
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    return new ethers.Wallet(`0x${env.ENV_SK!}`,provider);
}

export const OtherChain = async (name:string) => {

    const selectedChain = name.toUpperCase();
    // @ts-ignore
    const chain = await (await getFactory()).inner(Chain[selectedChain]);

    const rpc:string = chainToRpc(name)!;

    const signer = getEVMSigner(rpc) as ethers.Wallet;

    return {chain, signer}
}

export const getAccountRawHash = async () => {
    return CLPublicKey.fromHex(await CasperHelper.getActivePublicKey()).toAccountRawHashStr()
}