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

|     Direction     |  Operation   |                                           Explorer link                                            |
| :---------------: | :----------: | :------------------------------------------------------------------------------------------------: |
| Casper-> Moonbeam |   Approval   | https://testnet.cspr.live/deploy/02df192b718f65c19a91183ed8c79fc189c1fb7ac092f0e29cf8496a45ccd04c  |
| Casper-> Moonbeam |   Transfer   | https://testnet.cspr.live/deploy/feb77a4582019af3dc4a30566101c337c1c118069ac8880dda5d13a2c80db9dc  |
|    -> Moonbeam    | Mint Wrapped | https://moonbase.moonscan.io/tx/0xe64d5608f7842948249e156e97431f811dabda95aec20a07a19f4edc782cbae8 |

To replace Moonbeam with another network, replace the chain handler object with another one in `./srs/outgoing.ts`:

```ts
const { chain, signer } = await OtherChain("MOONBEAM");
```

to

```ts
const { chain, signer } = await OtherChain("YOURCHAINNAME");
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

|   Direction   |  Operation   |                                            Explorer link                                             |
| :-----------: | :----------: | :--------------------------------------------------------------------------------------------------: |
| BSC -> Casper |   Approval   | https://testnet.bscscan.com/tx/0xd8a2467d3c52e1ea1028687e29ec2aa3a64b76d55a9d619787a78180c2931eca |
| BSC -> Casper |   Transfer   | https://testnet.bscscan.com/tx/0x5603b42ca39047089404351e32e4b888450633b0a1d7f739a805af268d9c4209 |
| BSC -> Casper | Mint Wrapped |  https://testnet.cspr.live/deploy/79badd2b884f25312db5a12696290d76b5b078253ca79ced58f438d4ed01ad65   |
