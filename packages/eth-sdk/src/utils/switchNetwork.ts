export async function switchNetwork(chainId: number) {
  if (window.ethereum && window.ethereum.request) {
    try {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chainId.toString(16) }],
      })
    } catch (error) {
      console.error(error)
    }
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 100)
  })
}
