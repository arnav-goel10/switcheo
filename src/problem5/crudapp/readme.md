# a. Explain what does it mean by breaking consensus.

Breaking consensus means that the blockchain network no longer agrees on a single, unified state because nodes process transactions (and other state transitions) using different rules. In a blockchain, consensus ensures that every node, given the same input (transactions, block data, etc.), deterministically arrives at the same ledger state. A consensus-breaking change requires everyone to upgrade their software client, if not, nodes running different versions will produce divergent ledger states, leading to a network fork.

# b. Explain why your change would break the consensus.

Our proposed change appends the block's timestamp to a post's title during an update. Although the timestamp is part of the block header and is deterministic within a block, the change is non-backward-compatible:

- **Different Rule Application:**  
  Nodes running the updated software will append the timestamp to the title, while nodes running the old software will not. This difference means that the same transaction produces different outcomes depending on the node's software version.

- **Requirement for Universal Upgrade:**  
  To maintain consensus, every node must use the same transaction processing rules. Since this change forces nodes to update their software, failing to do so results in divergent states across the network.

- **Resulting Ledger Divergence:**  
  When some nodes apply the new rule and others do not, the ledger state diverges, breaking consensus and potentially leading to a network fork where multiple versions of the ledger exist concurrently.
