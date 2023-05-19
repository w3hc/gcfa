# Good CFA 

## Install

```
npm i
```

## Test

```
npx hardhat test
```

## Deploy

Create a `.env` on the model of `.env.example`:

```js
cp .env.example .env
```

Add your own keys in your `.env` file. 

Deploy to `alfajores` (Celo Testnet):

```
npx hardhat run scripts/clear.ts
npx hardhat run scripts/deploy.ts --network alfajores
```

## Supported networks

- Celo Mainnet
- Celo Alfajores Testnet
- Ethereum Goerli Testnet
- Gnosis Chain Mainnet
- Gnosis Chiado Testnet

## cEUR contract address

0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73 ([CeloScan](https://celoscan.io/token/0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73), [Coingecko](https://www.coingecko.com/en/coins/celo-euro))

## EURe contract address

0xcB444e90D8198415266c6a2724b7900fb12FC56E ([GnosisScan](https://gnosisscan.io/token/0xcB444e90D8198415266c6a2724b7900fb12FC56E), [Coingecko](https://www.coingecko.com/en/coins/monerium-eur-money))


## Latest deployment

Alfajores: 

- [EURMock](https://alfajores.celoscan.io/address/0x6Bd981edF241d252b48aF662A52E9d3cA84cdFae#code)
- [gCFA](https://alfajores.celoscan.io/address/0xEc12e5d24f3488C8cC22381caa1cECe12a5C254f#code)
- [DAO](https://alfajores.celoscan.io/address/0x020b796c418c363be5517c6febff5c5a9248f763#code)

Chiado: 

- [EURMock](https://blockscout.chiadochain.net/address/0x4bdf99b0e13457a367f4d1ffcefb8cec88f36199)
- [gCFA](https://blockscout.chiadochain.net/address/0x425F7D52ca97DA275e2218AB15cdDfE58e424Db2)

## Versions

- Node [v18.15.0](https://nodejs.org/uk/blog/release/v18.15.0/)
- NPM [v9.5.0](https://github.com/npm/cli/releases/tag/v9.5.0)
- OpenZeppelin Contracts [v4.8.0](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.8.0)

## Support

You can contact me via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discord.com/invite/uSxzJp3J76), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).
