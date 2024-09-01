<h1>Suitizen Dapp Api Spec</h1>

<h3>Get Execute Transcation Block Api </h3>

// Mint Suitizen Card <br>
packMintTxb <br>
```
Request :
  suiNs: string, <-- 用戶 Sui Name Service NFT Object ID
  index: number, <-- Random index, 需先呼叫 checkIndexExist 確認 index 不存在
  pfpImg: string, <-- walrus blobId
  cardImg: string, <-- walrus blobId
  faceFeature: string <-- walrus blobId

Response :
Transcation Block

```

// New Vote Proposal & New Discuss Proposal <br>
packNewProposalTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  category: number, <-- Vote 帶 0, Discuss 帶 1
  topic: string, <-- 主題名稱
  description: string, <-- 描述
  contents: string[] <-- Vote: 選項內容, Discuss: 可不帶，有值則為 Comment 內容

Response :
Transcation Block

```

// Vote <br>
packVoteTxb <br>
```
Request :
  proposalId: string, <-- packNewProposalTxb 執行完後，呼叫 getProposal，回傳物件內 data 迴圈內物件的 objectId 欄位
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  voteOption: number <-- data 迴圈內物件的 options 迴圈內物件的 index 欄位

Response :
Transcation Block

```

// Discuss <br>
packDiscussTxb <br>
```
Request :
  proposalId: string, <-- packNewProposalTxb 執行完後，呼叫 getProposal，回傳物件內 data 迴圈內物件的 objectId 欄位
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  content: string <-- 留言內容

Response :
Transcation Block

```

<h3> Get Data Api </h3>

// 取得用戶的 Sui Name Service NFT List <br>
getUserSuiNS <br>
```
Request :
  address: string <-- 用戶的錢包地址

Response :
[
  {
    "objectId": "0x3495f2856f70e1ea81c0d25a5d3bdc0dfb2c5b219ffafbc96a141c56f31bb160",
    "domainName": "ryan-hsu-1991.sui",
    "imageUrl": "QmaLFg4tQYansFpyRqmDfABdkUVy66dHtpnkH15v1LPzcY"
  }
]

```

// 取得用戶 Suitizen Card <br>
getUserSuitizenCard <br>
```
Request :
  address: string <-- 用戶的錢包地址

Response :
[
  {
    "objectId": "0x211060bd182b88702f745a921f74efd787a833ef04402d30f7e9642c6d2fcf3a",
    "cardImg": "isAUu8t8u0bMCp1r4ZKeIRvpKdN-ivDY0yILn2Hj5J8",
    "faceFeature": "isAUu8t8u0bMCp1r4ZKeIRvpKdN-ivDY0yILn2Hj5J8",
    "firstName": "sui",
    "lastName": "ryan-hsu"
  }
]

```

// 檢查 index 是否存在，return true 為 已存在，false 為不存在 <br>
checkIndexExist <br>
```
Request :
  index: number

Response :
true or false

```

// 取得 Vote & Discuss Proposal <br>
getProposal <br>
```
Request:
  category: number, <-- Vote 帶 0，Discuss 帶 1
  cursor: string | null, <-- 第一頁帶 null，回傳物件會給 nextCursor，帶入會給下一頁的資訊
  limit: number | null <-- 可以限制一次查幾筆

Response:

Vote
{
  "hasNextPage": false,
  "nextCursor": "0x424bf718e7c7e6191f4aeb3a11260ea28160d7e762e7a409962e4bf9160eb431",
  "data": [
    {
      "category": "0",
      "categoryStr": "VOTE",
      "topic": "Lunch?",
      "description": "Guess what I want to eat ?",
      "flowNum": "0",
      "proposer": "0x14859ca57faa6ab08f81565946dda5a845835b619694dff9a673bc22ef27394c",
      "objectId": "0xcf6f9e28832b20bd79de62094999d0570b10d7da76b35b484232ede97e29f526",
      "options": [
        {
          "index": 0, <-- 選項index
          "amount": "1", <-- 選項被投票次數
          "content": "A" <-- 選項內容
        },
        {
          "index": 1,
          "amount": "0",
          "content": "B"
        },
        {
          "index": 2,
          "amount": "0",
          "content": "C"
        },
        {
          "index": 3,
          "amount": "0",
          "content": "D"
        }
      ]
    }
  ]
}

Discuss
{
  "hasNextPage": false,
  "nextCursor": "0x9b229dc9124b08bbc68b05e478530825a5fc8bf14d608edd38dca0edad9f58ac",
  "data": [
    {
      "category": "1",
      "categoryStr": "DISCUSS",
      "topic": "test discuss topic",
      "description": "test discuss description",
      "flowNum": "0",
      "proposer": "0x211060bd182b88702f745a921f74efd787a833ef04402d30f7e9642c6d2fcf3a",
      "objectId": "0x5f8327175ec8c21832371272793b53bf2061f214fa0b85f0b6e6cdd01eb84762",
      "comments": [
        {
          "name": "sui Ryan", <-- 留言用戶 Suitizen Card 名稱
          "content": "hello test", <-- 留言內容
          "sender": "0x211060bd182b88702f745a921f74efd787a833ef04402d30f7e9642c6d2fcf3a"
        },
        {
          "name": "sui Ryan",
          "content": "Ryan Test",
          "sender": "0x211060bd182b88702f745a921f74efd787a833ef04402d30f7e9642c6d2fcf3a"
        }
      ]
    }
  ]
}

```
