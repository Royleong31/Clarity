# Clarity Contracts

## Table of Contents

- [Introduction](#introduction)
- [How It Works](#overall-contract-architecture)
- [External Technologies Used](#external-technologies-used)
- [Deployed Contract Addresses](#deployed-contract-addresses)
- [Sign Protocol Schema Configurations](#sign-protocol-schema-configurations)

## Introduction

Clarity is a public payment gateway designed to tackle the multibillion-dollar problem of fake reviews by enabling seamless, verifiable on-chain payments and reviews.

## Overall Contract Architecture

Clarity consists of three main contracts - **(1) `Clarity` (main)**, **(2) `ClaritySPHook`**, and **(3) Sign Protocol’s `SP`** contract while integrated in the `ERC-4337` Account Abstraction module infrastructure provided by Biconomy.

The main `Clarity.sol` manages all cash flow from order payments between customers and merchants while enabling reviews through Sign Protocol’s attestations. To enable the best flexibility and convenience for users, the contract integrates multi-token swaps via OneInchSwapHelper to facilitate payment settlement in different currencies.

The `Clarity` main contract integrates the Sign Protocol to leverage its review schema and custom hook instance (ClaritySPHook) for enhanced attestation capabilities. This integration ensures that reviews are not only verified but also tied to specific users through privacy-preserving methods such as WorldID.

### Integration with Sign Protocol

The Clarity contract integrates with the Sign Protocol to leverage its review schema and custom hook instance for enhanced attestation capabilities that guarantees immutable and censorship resistant. This integration ensures that reviews are not only verified, but also tied to users’ identities through privacy-preserving methods such as WorldID. WolrdID also powers our native loyalty points system that can serve as an effective scoring for authentic proactiveness and even social capital.

### ClaritySPHook Integration

Clarity initialises with a specified schema ID from the Sign Protocol, which defines the structure and requirements for review attestations. The ClaritySPHook contract not only serves as the callback interaction between Clarity and the Sign Protocol, but also as the primary rewards management ledger for Clarity’s native loyalty points system which integrates with WorldID’s zero-knowledge proofs for humanhood verification to keep track and account for a person’s authentic participation.

### `ERC-4337` Account Abstraction Architecture

Integrating all contract function calls into Biconomy’s account abstraction module enables efficient bundling of transactions sponsored with a dedicated paymaster while enabling the core solution for managing payments and reviews on the blockchain.

The combination of WorldID combines robust attestation mechanisms, privacy-preserving identity verification, and an incentive-based rewards system to create a secure and efficient ecosystem for e-commerce and decentralised applications. This integration ensures that reviews are credible, users are verified, and the entire process is transparent and automated.

## External Technologies Used

- Sign Protocol's @ethsign/sign-protocol-evm
- OpenZeppelin Open-Sourced Contracts

## Deployed Contract Addresses

### Sepolia

`Clarity`: 0xD8ddF4B409c0CE730c1BE601cF7839Bec9446CdB

`ClaritySPHook`: 0x3d19B632faD6Da763Ae6093CabBCA6bE75eB5013

### Base Sepolia

`Clarity`: 0xf46e3b69cade327915b7ce6da7aa64624303c83e

`ClaritySPHook`: 0x8932ec030eb39df9d5d824bca3e68d05a0424ba6

### Arbitrum Sepolia

`Clarity`: 0x75e4a20340F34D9006872e40C0144a691742962B

`ClaritySPHook`: 0xA4f85bCB7e151e5A1D32C3ECD3Bc1b8C3AA0992a

## Sign Protocol Schema Configurations

### Sepolia

`schemaId`: `onchain_evm_11155111_0x25d`

### Base Sepolia

`schemaId`: `onchain_evm_84532_0x2ed`

### Arbitrum Sepolia

`schemaId`: `onchain_evm_421614_0x101`
