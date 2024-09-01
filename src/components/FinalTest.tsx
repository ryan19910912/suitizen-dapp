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
} from '../api/sui_api';
import { useState, useEffect } from 'react';

export function FinalTest() {

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
        await checkIndexExist(0);
        let userSuitizenCardList = await getUserSuitizenCard(account.address);
        console.log(userSuitizenCardList);
        setUserSuitizenCardId(userSuitizenCardList[0].objectId);
        let voteVo = await getProposal(0, null, null);
        console.log(voteVo);
        setVoteId(voteVo.data[0].objectId);
        setVoteOptionNum(voteVo.data[0].options[2].index);
        let discussVo = await getProposal(1, null, null);
        console.log(discussVo);
        setDiscussId(discussVo.data[0].objectId);
        setDiscussContent("Ryan Test");
      }
    }
    run();
  }, [account]);

  return (
    <>
      <div>
        <button onClick={() => packMintTxb(
          "0xa388886c2add9fa5d51cb212bf435a90e5ab7bb615877bc7745078d77445f67f",
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
          "test vote topic",
          "test vote description",
          [
            "option 1",
            "option 2"
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
          "test discuss topic 1",
          "test discuss description 1",
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
    </>
  )
}