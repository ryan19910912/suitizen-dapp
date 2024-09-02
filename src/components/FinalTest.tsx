import { useCurrentAccount, useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import {
  packMintTxb,
  packNewProposalTxb,
  packVoteTxb,
  packDiscussTxb,
  getUserSuiNS,
  checkIndexExist,
  getUserSuitizenCard,
  getProposal,
  packTakeUserSuiNsTxb
} from '../api/sui_api';
import { useState, useEffect } from 'react';

export function FinalTest() {

  let [userNsId, setUserNsId] = useState("");
  let [userSuitizenCardId, setUserSuitizenCardId] = useState("");
  let [voteId, setVoteId] = useState("");
  let [voteOptionNum, setVoteOptionNum] = useState(1);
  let [discussId, setDiscussId] = useState("");
  let [discussContent, setDiscussContent] = useState("");

  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();

  useEffect(() => {
    async function run() {
      if (account) {
        console.log(account);
        let userSuiNsList = await getUserSuiNS(account.address);
        console.log(userSuiNsList);
        if (userSuiNsList.length > 0){
          setUserNsId(userSuiNsList[0].objectId);
        }

        await checkIndexExist(0);

        let userSuitizenCardList = await getUserSuitizenCard(account.address);
        console.log(userSuitizenCardList);
        if (userSuitizenCardList.length > 0){
          setUserSuitizenCardId(userSuitizenCardList[0].objectId);
        }

        let voteVo = await getProposal(0, null, 2);
        console.log(voteVo);
        if (voteVo.data.length > 0){
          setVoteId(voteVo.data[0].objectId);
          setVoteOptionNum(voteVo.data[0].options[0].index);
        }

        let discussVo = await getProposal(1, null, 2);
        console.log(discussVo);
        if (discussVo.data.length > 0){
          setDiscussId(discussVo.data[0].objectId);
          setDiscussContent("Resign !!");
        }
      }
    }
    run();
  }, [account]);

  return (
    <>
      <div>
        <button onClick={() => packMintTxb(
          userNsId,
          0,
          "isAUu8t8u0bMCp1r4ZKeIRvpKdN-ivDY0yILn2Hj5J8",
          "isAUu8t8u0bMCp1r4ZKeIRvpKdN-ivDY0yILn2Hj5J8",
          "isAUu8t8u0bMCp1r4ZKeIRvpKdN-ivDY0yILn2Hj5J8"
        ).then((txb: any) => {
          if (txb) {
            signAndExecuteTransactionBlock(
              {
                transactionBlock: txb,
                options: {
                  showBalanceChanges: true,
                  showObjectChanges: true,
                  showEvents: true,
                  showEffects: true,
                  showInput: true,
                  showRawInput: true
                }
              },
              {
                onSuccess: (successResult) => {
                  console.log('packMintTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packMintTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Mint Suitizen Card
        </button>
      </div>
      <div>
        <button onClick={() => packNewProposalTxb(
          userSuitizenCardId,
          0,
          "Choose ~",
          "What do you do on holidays ?",
          [
            "Eat delicious snacks",
            "Play basketball",
            "Watch TV",
            "Play games"
          ]
        ).then((txb: any) => {
          if (txb) {
            signAndExecuteTransactionBlock(
              {
                transactionBlock: txb,
                options: {
                  showBalanceChanges: true,
                  showObjectChanges: true,
                  showEvents: true,
                  showEffects: true,
                  showInput: true,
                  showRawInput: true
                }
              },
              {
                onSuccess: (successResult) => {
                  console.log('packNewProposalTxb Vote success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packNewProposalTxb Vote error', errorResult);
                },
              },
            );
          }
        })}>
          New Vote Proposal
        </button>
      </div>
      <div>
        <button onClick={() => packNewProposalTxb(
          userSuitizenCardId,
          1,
          "talk now",
          "Software engineer talks about hardships",
          []
        ).then((txb: any) => {
          if (txb) {
            signAndExecuteTransactionBlock(
              {
                transactionBlock: txb,
                options: {
                  showBalanceChanges: true,
                  showObjectChanges: true,
                  showEvents: true,
                  showEffects: true,
                  showInput: true,
                  showRawInput: true
                }
              },
              {
                onSuccess: (successResult) => {
                  console.log('packNewProposalTxb Discuss success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packNewProposalTxb Discuss error', errorResult);
                },
              },
            );
          }
        })}>
          New Discuss Proposal
        </button>
      </div>
      <div>
        <button onClick={() => packVoteTxb(
          voteId,
          userSuitizenCardId,
          voteOptionNum
        ).then((txb: any) => {
          if (txb) {
            signAndExecuteTransactionBlock(
              {
                transactionBlock: txb,
                options: {
                  showBalanceChanges: true,
                  showObjectChanges: true,
                  showEvents: true,
                  showEffects: true,
                  showInput: true,
                  showRawInput: true
                }
              },
              {
                onSuccess: (successResult) => {
                  console.log('packVoteTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packVoteTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Vote
        </button>
      </div>
      <div>
        <button onClick={() => packDiscussTxb(
          discussId,
          userSuitizenCardId,
          discussContent
        ).then((txb: any) => {
          if (txb) {
            signAndExecuteTransactionBlock(
              {
                transactionBlock: txb,
                options: {
                  showBalanceChanges: true,
                  showObjectChanges: true,
                  showEvents: true,
                  showEffects: true,
                  showInput: true,
                  showRawInput: true
                }
              },
              {
                onSuccess: (successResult) => {
                  console.log('packDiscussTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packDiscussTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Discuss
        </button>
      </div>
      <div>
        <button onClick={() => packTakeUserSuiNsTxb(
          userSuitizenCardId
        ).then((txb: any) => {
          if (txb) {
            signAndExecuteTransactionBlock(
              {
                transactionBlock: txb,
                options: {
                  showBalanceChanges: true,
                  showObjectChanges: true,
                  showEvents: true,
                  showEffects: true,
                  showInput: true,
                  showRawInput: true
                }
              },
              {
                onSuccess: (successResult) => {
                  console.log('packTakeUserSuiNsTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packTakeUserSuiNsTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Take User Sui Ns
        </button>
      </div>
    </>
  )
}