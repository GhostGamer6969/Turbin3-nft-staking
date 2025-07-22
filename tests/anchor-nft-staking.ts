import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorNftStaking } from "../target/types/anchor_nft_staking";
import { PublicKey } from "@solana/web3.js"

describe("anchor-nft-staking", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);


  const wallet = provider.wallet

  const program = anchor.workspace.anchorNftStaking as Program<AnchorNftStaking>;

  const mint = new PublicKey("Fwm7BwBDbnLfwijd1jaP21LhL8VjqP78AWH67EFvjyDX")
  const collection = new PublicKey("2PQkQS9DyxopvhE9AqnxoZZ7PgsaKMga5fXupDzuKxVX")
  const METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");


  const [configPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("config")],
    program.programId,
  )
  const [rewardsPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("rewards"),
      configPDA.toBuffer(),
    ],
    program.programId,
  )

  const [userPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("user"),
      wallet.publicKey.toBuffer(),
    ],
    program.programId,
  )
  const [stakePDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("stake"),
      mint.toBuffer(),
      configPDA.toBuffer(),
    ],
    program.programId,
  )

  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  );

  const [edtionPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    METADATA_PROGRAM_ID
  );




  it("Is Config initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initializeConfig(2, 200, 60)
      .accountsPartial({
        admin: wallet.publicKey,
        config: configPDA,
        rewardsMint: rewardsPDA,
      })
      .rpc()
    console.log("Your transaction signature", tx);
  });

  it("Is User intialized", async () => {
    const tx = await program.methods.initializeUser()
      .accountsPartial({
        user: wallet.publicKey,
        userAccount: userPDA,
      })
      .rpc()

    console.log("Your transaction signature", tx);
  })
  // it("Is stake", async () => {
  //   const tx = await program.methods.stake()
  //     .accountsPartial({
  //       user: wallet.publicKey,
  //       mint: mint,
  //       userAccount: userPDA,
  //       stakeAccount: stakePDA,
  //       config: configPDA,
  //       collection: collection,
  //       metadata: metadataPDA,
  //       edition: edtionPDA
  //     })
  //     .rpc()

  //   console.log("Your transaction signature", tx);
  // })
  // it("Is unstake", async () => {
  //   const tx = await program.methods.unstake()
  //     .accountsPartial({
  //       user: wallet.publicKey,
  //       mint: mint,
  //       userAccount: userPDA,
  //       stakeAccount: stakePDA,
  //       config: configPDA,
  //       collectionMint: collection,
  //       metadata: metadataPDA,
  //       edition: edtionPDA
  //     }).rpc()

  //   console.log("Your transaction signature", tx);
  // })
  it("Is claim", async () => {
    const tx = await program.methods.claim()
      .accountsPartial({
        user: wallet.publicKey,
        userAccount: userPDA,
        config: configPDA,

      }).rpc()

    console.log("Your transaction signature", tx);
  })
});
