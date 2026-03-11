import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { SBT_ABI } from "@/lib/sbtAbi";

const RPC_URL = "https://sepolia.base.org";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SBT_CONTRACT_ADDRESS!;
const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { walletAddress } = await req.json();

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
    }

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(DEPLOYER_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, SBT_ABI, signer);

    const tx = await contract.mint(walletAddress);
    const receipt = await tx.wait();

    return NextResponse.json({
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    });
  } catch (error: unknown) {
    console.error("Mint error:", error);
    const message = error instanceof Error ? error.message : "Mint failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
