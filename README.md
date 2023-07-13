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
# Casper Public Key
PK=
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


To replace Moonbeam with another network, replace the chain handler object with another one in `./srs/setup.ts`:

```ts
export const OtherChain = async () => {
    return await (await getFactory()).inner(Chain.MOONBEAM);
}
```
to
```ts
export const OtherChain = async () => {
    return await (await getFactory()).inner(Chain.<YOURCHAIN>);
}
```
Make sure, the wallet of the other than Casper chain matches the chain protocol you selected above.


## 4. Transferring EVM -> Casper

1. Make sure you have NFTs on EVM to test with
2. To transfer to Casper run the following in the terminal:

```bash
ts-node ./src/incomming.ts
```