/** @format */
import abi from "@/assets/json/abi.json";
import { ethers } from "ethers";

async function switchOrAddSepolia(ethProvider) {
  try {
    const chainId = await ethProvider.provider.request({
      method: "eth_chainId",
    });
    const sepoliaChainId = "0xaa36a7";
    // Check if the current chain is Sepolia Testnet
    if (chainId !== sepoliaChainId) {
      // Try to switch to Sepolia Testnet
      await ethProvider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: sepoliaChainId }], // Sepolia Testnet Chain ID
      });
      console.log("Switched to Sepolia Testnet");

      if (error.code === 4902) {
        const infuraApiKey = "53163c736f1d4ba78f0a39ffda8d87b4";

        // If the chain is not added to the wallet, add it

        await ethProvider.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: sepoliaChainId,
              chainName: "Ethereum Sepolia Testnet",
              nativeCurrency: {
                name: "Sepolia Ether",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: [`https://sepolia.infura.io/v3/${infuraApiKey}`], // Replace with your RPC URL
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
        console.log("Sepolia Testnet added and switched");
      } else {
        console.error("Failed to switch to Sepolia Testnet:", error);
      }
    } else {
      console.log("Already connected to Sepolia Testnet");
    }
  } catch (error) {}
}

// Usage Example
// Ensure you pass the correct signer instance to this function

const getSigner = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  return provider.getSigner();
};

const getContract = async () => {
  if (!window.ethereum) {
    toast.info(
      "MetaMask is not installed. Please install it to use this feature."
    );
    return;
  }
  const signer = getSigner();
  // ensure chain is sepolia
  await switchOrAddSepolia(signer.provider);
  return new ethers.Contract(
    "0x5c43900216E26FE826e067db52763A53756BcE65",
    abi,
    signer
  );
};

export const addPointService = async (weight) => {
  try {
    const lifeSourceManager = await getContract();
    const tx = await lifeSourceManager.addPointFromWeight(Math.trunc(weight));
    await tx.wait(1);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getPointsService = async () => {
  try {
    const signer = getSigner();
    const lifeSourceManager = await getContract();

    const userAddress = await signer.getAddress();

    const points = await lifeSourceManager.userPoints(userAddress);
    return Number(points[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const redeemCodeService = async (point) => {
  try {
    const lifeSourceManager = await getContract();
    const tx = await lifeSourceManager.redeemCode(Math.trunc(point));
    await tx.wait(1);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
