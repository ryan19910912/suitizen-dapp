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
  birth: number <-- 生日(timestamp 毫秒)

Response :
Transcation Block

```

// New Vote Interaction & New Discuss Interaction <br>
packNewInteractionTxb <br>
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
  proposalId: string, <-- packNewInteractionTxb 執行完後，呼叫 getProposal，回傳物件內 data 迴圈內物件的 objectId 欄位
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  voteOption: number <-- data 迴圈內物件的 options 迴圈內物件的 index 欄位

Response :
Transcation Block

```

// Discuss <br>
packDiscussTxb <br>
```
Request :
  proposalId: string, <-- packNewInteractionTxb 執行完後，呼叫 getProposal，回傳物件內 data 迴圈內物件的 objectId 欄位
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  content: string <-- 留言內容

Response :
Transcation Block

```

// 拿回用戶的 Sui Name Service NFT <br>
packTakeUserSuiNsTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位

Response :
Transcation Block

```

// 新增 監護人 <br>
packAddGuardianTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  guardianName: string <-- 監護人 Suitizen Card 名稱, firstName(固定sui) + lastName(Sui NS選定的名稱)

Response :
Transcation Block

```

// 移除 監護人 <br>
packRemoveGuardianTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  guardianName: string <-- 監護人 Suitizen Card 名稱, firstName(固定sui) + lastName(Sui NS選定的名稱)

Response :
Transcation Block

```

// 建立 轉移 Suitizen Card Owner 請求<br>
packNewTransferRequestTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  newOwnerAddress: string <-- 轉移 Suitizen Card 給該 新Owner地址

Response :
Transcation Block

```

// 取消 轉移 Suitizen Card Owner 請求<br>
packCancelTransferRequestTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  requestId: string <-- getTransferRequestList 清單裡面的 objectId

Response :
Transcation Block

```

// 監護人 確認 轉移 Suitizen Card Owner 請求<br>
packConfirmTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  requestId: string <-- getTransferRequestList 清單裡面的 objectId

Response :
Transcation Block

```

// 監護人 反對 轉移 Suitizen Card Owner 請求<br>
packCancelConfirmTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  requestId: string <-- getTransferRequestList 清單裡面的 objectId

Response :
Transcation Block

```

// 轉移 Suitizen Card 給 新 owner<br>
packTransferCardTxb <br>
```
當 currentConfirm (目前通過票數) >= confirmThreshold (需通過票數)

Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  requestId: string <-- getTransferRequestList 清單裡面的 objectId

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
    "objectId": "0xc10c5840b08ff872e6837471c09c442f5575b9ceea952d0105fbeac6b0e22a05",
    "cardImg": "SSY-NodrATL7mY3dKDg-5erH4-uajcXP9kWF-l-C_Y4",
    "faceFeature": "SSY-NodrATL7mY3dKDg-5erH4-uajcXP9kWF-l-C_Y4",
    "firstName": "sui",
    "lastName": "ryan-hsu-test",
    "birth": "1725985950997",
    "guardians": [
        "0x3e37b4d2d3abe229932a68e5f5bb0987ce779f794bb45fc758bc26152ff62b4d"
    ]
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

// 取得 Vote & Discuss Interaction <br>
getInteraction <br>
```
Request:
  category: number, <-- Vote 帶 0，Discuss 帶 1
  cursor: string | null, <-- 第一頁帶 null，回傳物件會給 nextCursor，帶入會給下一頁的資訊
  limit: number | null <-- 可以限制一次查幾筆

Response:

Vote
{
    "category": "0",
    "categoryStr": "VOTE",
    "topic": "Choose ~",
    "description": "What do you do on holidays ?",
    "flowNum": "0",
    "objectId": "0x93ee358c1d49dff00c2a90b061e13768cebe1e06981180ecb028e04cea94ba85",
    "lastUpdate": "1725986530255",
    "options": [
        {
            "index": 0,
            "amount": "1",
            "content": "Eat delicious snacks"
        },
        {
            "index": 1,
            "amount": "0",
            "content": "Play basketball"
        },
        {
            "index": 2,
            "amount": "0",
            "content": "Watch TV"
        },
        {
            "index": 3,
            "amount": "0",
            "content": "Play games"
        }
    ]
}

Discuss
{
    "category": "1",
    "categoryStr": "DISCUSS",
    "topic": "talk now",
    "description": "Software engineer talks about hardships",
    "flowNum": "0",
    "objectId": "0x858ca8657f4b74b1b8f9b4ad6e91540eff3c5b71ad256e60e275be1407d5cb03",
    "lastUpdate": "1725986536972",
    "comments": [
        {
            "name": "sui ryan-hsu-1991-09-12",
            "content": "Resign !!",
            "sender": "0x3e37b4d2d3abe229932a68e5f5bb0987ce779f794bb45fc758bc26152ff62b4d"
        }
    ]
}

```

// 取得 該用戶所有提交的 Suitizen Card 轉移請求 清單 <br>
getTransferRequestList <br>
```
Request :
  cardId: string <-- 該用戶的 Suitizen Card ID

Response :
{
    "cardId": "0x572092b0339cdedc3c2c442d49e41957e1815c0b909acdde410d1f3f0eea63bf", <-- 該用戶的 Suitizen Card ID
    "confirmThreshold": "1", <-- 需通過票數
    "currentConfirm": "0", <-- 目前通過票數
    "guardians": [
        "0x3e37b4d2d3abe229932a68e5f5bb0987ce779f794bb45fc758bc26152ff62b4d" <-- 監護人 card id
    ],
    "newOwner": "0xe20abce08a16e397ec368979b03bb6323d42605b38c6bd9b6a983c6ebcc45e11", <-- 新 owner address
    "objectId": "0x64b5c21f35024bc6046fad46f58f41a121558756ba2aead65574b86e46c8ec7c" <-- 該物件的 object id
}

```