import { exit } from "process";
import { error, log } from "console";
import BigNumber from "bignumber.js";
import { Casper, getFactory, OtherChain } from "./setup";
import { Web3Helper } from "xp.network";

(async () => {
  const casper = await Casper();
  const factory = await getFactory();
  const {
    chain,
    signer,
  }: { chain: Web3Helper; signer: any } = await OtherChain("BSC");
  const EVM_PK = process.env.EVM_PK!;
  const casper_PK = process.env.AH!; // Account Hash

  const NFTs = await factory.nftList(chain, EVM_PK);

  const selected = NFTs[0];

  log(selected);

  const approval = await (chain as Web3Helper).preTransfer(
    signer,
    selected as any,
    new BigNumber(0) as any,
    {
      overrides: {
        gasPrice: await chain.getProvider().getGasPrice(),
      },
    }
  );

  log("Approval:", approval);

  const transfer = await factory.transferNft(
    chain as any,
    casper,
    selected,
    signer,
    casper_PK,
    undefined,
    undefined,
    undefined,
    undefined,
    await chain.getProvider().getGasPrice()
  );

  log("Transfer:", transfer);

  exit(0);
})().catch((e) => {
  error(e);
  exit(1);
});
