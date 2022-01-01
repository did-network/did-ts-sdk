# DID Network Typescript SDK

## DID SDK

SDK for DID Network

### Graph Oracle

```typescript
const didClient = new DidClient({
  headers: {
    authorization: `DID_AUTH_TOKEN`,
  },
})

// get account info, including binded wallet, followers, followings, etc.
const { account } = await didClient.getAccountInfo()
```

## DApp SDK

SDK for Common DApp

- Constants
- Hooks
  - useFetch: fetch data from API
  - useLocalStorageState: extension of useState to store and retrive data from local storage
  - useQuery: read query from URL and parse the params
- Utils
  - formatAmount: format BigNumber into human-readable test
  - shorten: shorten address/hash by truncate leading and tailing characters

## SOL SDK

SDK for Sonana DApp

- Cache
  - cache accounts in memory and retrive with listener
- Hooks
  - useNativeAccount: get native account wrapped with SOL balance
  - useTokenAccount: get token account
  - useUserBalance: get token balance of current user
- Utils
  - getMultipleAccounts: get multiple accounts from Solana RPC with trunk
  - isWrapperSol: is the token account wrapped SOL

## ETH SDK

SDK for ETH DApp
