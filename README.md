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
  guardianName: string <-- 監護人 Sui NS 的名稱，只需要輸入 first_name

Response :
Transcation Block

```

// 移除 監護人 <br>
packRemoveGuardianTxb <br>
```
Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  guardianName: string <-- 監護人 Sui NS 的名稱，只需要輸入 first_name

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
pageNumber or pageSize 其中一個為 null 則會回傳全部<br>
會依照 lastUpdate 排序，越新的會越前面
```
Request:
  category: number, <-- Vote 帶 0，Discuss 帶 1
  pageNumber: number | null, <-- 頁數
  pageSize: number | null <-- 每頁筆數

Response:

Vote
{
    "totalCount": 1, <-- 總數量，可以拿來做前端分頁用
    "data": [
        {
            "category": "0",
            "categoryStr": "VOTE",
            "topic": "Choose ~",
            "description": "What do you do on holidays ?",
            "flowNum": "0",
            "host": "0x2ee108d317583a041b6367a11523a7678ef7189fd9556987e464ccfafd74489e",
            "objectId": "0x58c57548ea699cc9712b3728eb1952e1e17a852e02ecffd83d68fa67674b2081",
            "lastUpdate": 1726123006548,
            "options": [
                {
                    "index": 0,
                    "amount": "2",
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
    ]
}

Discuss
{
    "totalCount": 1,
    "data": [
        {
            "category": "1",
            "categoryStr": "DISCUSS",
            "flowNum": "0",
            "lastUpdate": 1726123022867,
            "objectId": "0x029e5943a71aabe24930f3360be4fd65a773769b1e4e904f305cbd241cceb97c",
            "topic": "talk now",
            "description": "Software engineer talks about hardships",
            "host": "0x2ee108d317583a041b6367a11523a7678ef7189fd9556987e464ccfafd74489e",
            "comments": [
                {
                    "sender": "0xc18222257c45660246ee318101ad247faa9af94db90e52ee23a38b8a0a30c774",
                    "content": "Resign !!",
                    "name": "ryan-hsu-test-1 sui"
                },
                {
                    "name": "ryan-hsu-test sui",
                    "content": "Resign !!",
                    "sender": "0x2ee108d317583a041b6367a11523a7678ef7189fd9556987e464ccfafd74489e"
                }
            ]
        }
    ]
}

```

// 取得 Suitizen Card 轉移請求 清單 <br>
getTransferRequestList <br>
```
Request :
  cardId: string <-- 該用戶的 Suitizen Card ID
  type: number <-- 0: 查自己發起的請求, 1: 查自己為監護人待核准的請求
Response :
{
    "cardId": "0x572092b0339cdedc3c2c442d49e41957e1815c0b909acdde410d1f3f0eea63bf", <-- 發起請求的 Suitizen Card ID
    "confirmThreshold": "1", <-- 需通過票數
    "currentConfirm": "0", <-- 目前通過票數
    "guardians": [
        "0x3e37b4d2d3abe229932a68e5f5bb0987ce779f794bb45fc758bc26152ff62b4d" <-- 監護人 card id
    ],
    "newOwner": "0xe20abce08a16e397ec368979b03bb6323d42605b38c6bd9b6a983c6ebcc45e11", <-- 新 owner address
    "objectId": "0x64b5c21f35024bc6046fad46f58f41a121558756ba2aead65574b86e46c8ec7c" <-- 該物件的 object id
}

```

// 刷新 Interaction 緩存資料
refreshInteractionData <br>
在執行完 packNewInteractionTxb、packVoteTxb、packDiscussTxb 後呼叫


// 取得 CardId By Name
getCarIddByName
```
Request:
  name: string <-- 名稱
Response:
  cardId: string <-- Suitizen Card ID
```