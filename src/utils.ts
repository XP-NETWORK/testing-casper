import { MainNetRpcUri, TestNetRpcUri } from 'xp.network';
import {config} from 'dotenv';
config()

export const chainToRpc = (chain:string) => {

    const rpc = process.env.NETWORK! == 'testnet' 
        ? TestNetRpcUri
        : MainNetRpcUri;

    switch (chain.toUpperCase()) {
        case "ABEYCHAIN":
            return rpc.ABEYCHAIN
        case "APTOS":
            return TestNetRpcUri.APTOS
        case "ARBITRUM":
            return rpc.ARBITRUM
        case "AURORA":
            return rpc.AURORA
        case "AVALANCHE":
            return rpc.AVALANCHE
        case "BITGERT":
            return rpc.BITGERT
        case "BSC":
            return rpc.BSC
        case "CADUCEUS":
            return rpc.CADUCEUS
        case "CELO":
            return rpc.CELO
        case "ELROND":
            return rpc.ELROND
        case "FANTOM":
            return rpc.FANTOM
        case "GATECHAIN":
            return rpc.GATECHAIN
        case "GODWOKEN":
            return rpc.GODWOKEN
        case "HARMONY":
            return rpc.HARMONY
        case "HECO":
            return rpc.HECO
        case "HEDERA":
            return rpc.HEDERA
        case "IOTEX":
            return rpc.IOTEX
        case "MOONBEAM":
            return rpc.MOONBEAM
        case "NEAR":
            return rpc.NEAR
        case "OKC":
            return rpc.OKC
        case "POLYGON":
            return rpc.POLYGON
        case "SECRET":
            return rpc.SECRET
        case "SKALE":
            return rpc.SKALE
        case "SOLANA":
            return rpc.SOLANA
        case "TEZOS":
            return rpc.TEZOS
        case "TON":
            return rpc.TON
        case "TRON":
            return rpc.TRON
        case "VECHAIN":
            return rpc.VECHAIN
        case "VELAS":
            return rpc.VELAS
        case "XDAI":
            return rpc.XDAI
        default:
            break;
    }
}
