import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'

interface IProps {
  connection: Connection
  walletPublicKey: PublicKey | null
  signTransaction: any
  instructions: TransactionInstruction[]
  signers: Keypair[]
  onError: (tx: string, error: string) => void
  awaitConfirmation: boolean
}

export const sendTransaction = async ({ connection, walletPublicKey, signTransaction, instructions, signers, onError, awaitConfirmation = true }: IProps) => {
  if (!walletPublicKey) {
    throw new Error('Wallet is not connected')
  }

  if (instructions.length === 0) {
    throw new Error('No instruction')
  }

  let transaction = new Transaction({ feePayer: walletPublicKey })
  instructions.forEach((instruction) => transaction.add(instruction))
  transaction.recentBlockhash = (await connection.getRecentBlockhash('max')).blockhash
  if (signers.length > 0) {
    transaction.partialSign(...signers)
  }
  transaction = await signTransaction(transaction)
  const rawTransaction = transaction.serialize()
  let options = {
    skipPreflight: true,
    commitment: 'singleGossip',
  }

  const txid = await connection.sendRawTransaction(rawTransaction, options)

  if (awaitConfirmation) {
    const status = (await connection.confirmTransaction(txid, options && (options.commitment as any))).value

    if (status?.err) {
      const errors = await getErrorForTransaction(connection, txid)
      onError(txid, errors.join(' & '))

      throw new Error(`Raw transaction ${txid} failed (${JSON.stringify(status)})`)
    }
  }

  return txid
}

const getErrorForTransaction = async (connection: Connection, txid: string) => {
  await connection.confirmTransaction(txid, 'max')

  const tx = await connection.getParsedConfirmedTransaction(txid)

  const errors: string[] = []
  if (tx?.meta && tx.meta.logMessages) {
    tx.meta.logMessages.forEach((log) => {
      const regex = /Error: (.*)/gm
      let m
      while ((m = regex.exec(log)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++
        }

        if (m.length > 1) {
          errors.push(m[1])
        }
      }
    })
  }

  return errors
}
