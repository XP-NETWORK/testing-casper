# Testing Casper

## 1. Installation

The following commands will clone the project, enter the project's folder & install the dependencies.

```bash
git clone https://github.com/XP-NETWORK/testing-casper.git
cd testing-casper/
yarn
```

## 2. Setup the environment

Create the `.env` file and populate it with the key-value pairs

```bash
# Casper Private Key
SK=
# Casper Account Hash
AH=
# testnet | mainnet
NETWORK=testnet
# EVM Private key
ENV_SK=
# EVM Public Key
EVM_PK=
```

## 3. Transferring Casper -> EVM

1. Make sure you have NFTs on Casper to test with
2. To transfer to ex. Moonbeam, run the following in the terminal:

```bash
ts-node ./src/outgoing.ts
```

### Example Testnet transactions:

|Direction| Operation| Explorer link|
|:-:|:-:|:-:|
|Casper-> Moonbeam|Approval|https://testnet.cspr.live/deploy/03aff895959e4a996124a5d32b2d4e487054e5f9eeb5cce5ad158cba84f8a4de|
|Casper-> Moonbeam|Transfer|https://testnet.cspr.live/deploy/5d59527523955e20c6d7cebea4ffa0d4573ef73267278a8d07c8f5b532c0d14e|
|-> Moonbeam| Mint Wrapped| https://moonbase.moonscan.io/tx/0x7fa85e840b5caa0c84f45cd95158634ca13c0bf8ad73d15c7425cee6316d4fac|


To replace Moonbeam with another network, replace the chain handler object with another one in `./srs/outgoing.ts`:

```ts
const {chain, signer} = await OtherChain("MOONBEAM");
```
to
```ts
const {chain, signer} = await OtherChain("YOURCHAINNAME");
```

Choose `YOURCHAINNAME` from the list in the switch case here: `./src/utils`.

Make sure, the wallet of the other than Casper chain matches the chain protocol you selected above.


## 4. Transferring EVM -> Casper

1. Make sure you have NFTs on EVM to test with
2. To transfer to Casper run the following in the terminal:

```bash
ts-node ./src/incomming.ts
```

### Example Testnet transactions:

|Direction| Operation| Explorer link|
|:-:|:-:|:-:|
|Mumbai -> Casper|Approval|https://mumbai.polygonscan.com/tx/0x5b64e30ad346d2d76bb3a79c695a7862d879f7f4900e8ebfa34ee6a63ae9760a|
|Mumbai -> Casper|Transfer|https://mumbai.polygonscan.com/tx/0xb088cfe836d54adff8e786b4d553d3f79d1f7e30bc4c1700da1f9cfde9196483|
|-> Casper| Mint Wrapped| https://testnet.cspr.live/contract-package/0074557b46c7a7c13e0b178e4463f451325129d845e9e494425d39cfd40e619d|