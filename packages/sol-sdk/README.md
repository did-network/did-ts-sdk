# @did-network/sol-sdk

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
