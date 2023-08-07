export const SendTokenTx = `
import FungibleToken from 0x9a0766d93b6608b7 
import FlowToken from 0x7e60df042a9c0868 

transaction(amount: UFix64, recipient: Address) {
    let sentVault: @FungibleToken.Vault
    prepare(signer: AuthAccount) {
        let vaultRef = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("failed to borrow reference to sender vault")
        self.sentVault <- vaultRef.withdraw(amount: amount)
    }
    execute {
        let receiverRef = getAccount(recipient)
            .getCapability(/public/flowTokenReceiver)
            .borrow<&{FungibleToken.Receiver}>()
            ?? panic("failed to borrow reference to recipient vault")
        receiverRef.deposit(from: <-self.sentVault)
    }
}
`;
