
import { address, toNano } from "@ton/core";
import { compile, NetworkProvider } from "@ton/blueprint";
import { MainContract } from "../wrappers/MainContract";

export async function run(provider: NetworkProvider) {
  const myContract = MainContract.createFromConfig(
    {
      number: 0,
      address: address("EQABqFMmiovrzbUvI0KB395yzdOGXasyCWyQ-JhMzKdYIfAA"),
      owner_address: address(
        "EQABqFMmiovrzbUvI0KB395yzdOGXasyCWyQ-JhMzKdYIfAA"
      ),
    },
    await compile("MainContract")
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano("0.05"));

  await provider.waitForDeploy(myContract.address);
}