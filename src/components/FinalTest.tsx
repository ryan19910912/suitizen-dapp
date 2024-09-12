import { useCurrentAccount, useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import {
  packMintTxb,
  packNewInteractionTxb,
  packVoteTxb,
  packDiscussTxb,
  getUserSuiNS,
  checkIndexExist,
  getUserSuitizenCard,
  getInteraction,
  packTakeUserSuiNsTxb,
  packAddGuardianTxb,
  packRemoveGuardianTxb,
  packNewTransferRequestTxb,
  getTransferRequestList,
  packCancelTransferRequestTxb,
  packConfirmTxb,
  packCancelConfirmTxb,
  packTransferCardTxb,
  getCardByGuardianName,
  refreshInteractionData
} from '../api/sui_api';
import { useState, useEffect } from 'react';

export function FinalTest() {

  let [userNsId, setUserNsId] = useState("");
  let [userSuitizenCardId, setUserSuitizenCardId] = useState("");
  let [voteId, setVoteId] = useState("");
  let [voteOptionNum, setVoteOptionNum] = useState(1);
  let [discussId, setDiscussId] = useState("");
  let [discussContent, setDiscussContent] = useState("");
  let [guardianName, setGuardianName] = useState("ryan-hsu-test-1");
  let [newOwner, setNewOwner] = useState("0xe20abce08a16e397ec368979b03bb6323d42605b38c6bd9b6a983c6ebcc45e11");
  let [requestId, setRequestId] = useState("");

  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();

  // TODO
  useEffect(() => {
    // 初始化 Interaction 緩存數據，存入 firebase
    refreshInteractionData();
  }, []);


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

        let voteVo: any = await getInteraction(0, 1, 1);
        console.log(voteVo);
        if (voteVo.data.length > 0){
          setVoteId(voteVo.data[0].objectId);
          setVoteOptionNum(voteVo.data[0].options[0].index);
        }

        let discussVo: any = await getInteraction(1, 1, 1);
        console.log(discussVo);
        if (discussVo.data.length > 0){
          setDiscussId(discussVo.data[0].objectId);
          setDiscussContent("Resign !!");
        }

        if (userSuitizenCardList.length > 0){
          let requestVoList = await getTransferRequestList(userSuitizenCardList[0].objectId);
          console.log(requestVoList);
          if (requestVoList.length > 0){
            setRequestId(requestVoList[0].objectId);
          }
        }

        let guardianCardId = await getCardByGuardianName("suiryan-hsu-test-1");
        console.log(guardianCardId);
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
          "SSY-NodrATL7mY3dKDg-5erH4-uajcXP9kWF-l-C_Y4",
          "SSY-NodrATL7mY3dKDg-5erH4-uajcXP9kWF-l-C_Y4",
          "SSY-NodrATL7mY3dKDg-5erH4-uajcXP9kWF-l-C_Y4",
          Date.now()
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
        <button onClick={() => packNewInteractionTxb(
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
          New Vote Interaction
        </button>
      </div>
      <div>
        <button onClick={() => packNewInteractionTxb(
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
          New Discuss Interaction
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
      <div>
        <button onClick={() => packAddGuardianTxb(
          userSuitizenCardId,
          guardianName
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
                  console.log('packAddGuardianTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packAddGuardianTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Add Guardian
        </button>
      </div>
      <div>
        <button onClick={() => packRemoveGuardianTxb(
          userSuitizenCardId,
          guardianName
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
                  console.log('packRemoveGuardianTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packRemoveGuardianTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Remove Guardian
        </button>
      </div>
      <div>
        <button onClick={() => packNewTransferRequestTxb(
          userSuitizenCardId,
          newOwner
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
                  console.log('packNewTransferRequestTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packNewTransferRequestTxb error', errorResult);
                },
              },
            );
          }
        })}>
          New Transfer Request
        </button>
      </div>
      <div>
        <button onClick={() => packCancelTransferRequestTxb(
          userSuitizenCardId,
          requestId
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
                  console.log('packCancelTransferRequestTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packCancelTransferRequestTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Cancel Transfer Request
        </button>
      </div>
      <div>
        <button onClick={() => packConfirmTxb(
          userSuitizenCardId,
          requestId
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
                  console.log('packConfirmTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packConfirmTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Confirm
        </button>
      </div>
      <div>
        <button onClick={() => packCancelConfirmTxb(
          userSuitizenCardId,
          requestId
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
                  console.log('packCancelConfirmTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packCancelConfirmTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Cancel Confirm
        </button>
      </div>
      <div>
        <button onClick={() => packTransferCardTxb(
          userSuitizenCardId,
          requestId
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
                  console.log('packTransferCardTxb success', successResult);
                },
                onError: (errorResult) => {
                  console.error('packTransferCardTxb error', errorResult);
                },
              },
            );
          }
        })}>
          Transfer Card
        </button>
      </div>
    </>
  )
}