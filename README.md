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
  backup: string <-- 備用錢包地址

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

// 轉移 Suitizen Card 給 backup<br>
packTransferCardTxb <br>
```

Request :
  cardId: string, <-- packMintTxb 執行完後 呼叫 getUserSuitizenCard，回傳物件內的 objectId 欄位
  newBackup: string <-- 新的 備用錢包地址

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
    "backup": "0x3e37b4d2d3abe229932a68e5f5bb0987ce779f794bb45fc758bc26152ff62b4d"
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