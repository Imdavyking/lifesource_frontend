/** @format */
import abi from "@/assets/json/abi.json";
import { ethers } from "ethers";

const lifeSourceManager = new ethers.Contract(
  "0x04A24B8894fAf25989d47B2DeF745Ed098258b16",
  abi
);

const getContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();
  const sepoliaChainId = 11155111; //0xaa36a7
  // ensure chain is sepolia
  const chainId = await signer.provider.request({ method: "eth_chainId" });
  if (Number(chainId) !== sepoliaChainId) {
    // switch or add chain
  }
  const lifeSourceManager = new ethers.Contract(
    "0x04A24B8894fAf25989d47B2DeF745Ed098258b16",
    abi,
    signer
  );
  return lifeSourceManager;
};

export const addPointService = async (weight) => {
  try {
    const lifeSourceManager = await getContract();
    await lifeSourceManager.addPointFromWeight(Math.trunc(weight));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const redeemCodeService = async (point) => {
  try {
    const lifeSourceManager = await getContract();
    await lifeSourceManager.redeemCode(Math.trunc(point));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
