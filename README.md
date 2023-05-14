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

## cEUR contract address

0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73 ([CeloScan](https://celoscan.io/token/0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73), [Coingecko](https://www.coingecko.com/en/coins/celo-euro))

## EURe contract address

0xcB444e90D8198415266c6a2724b7900fb12FC56E ([GnosisScan](https://gnosisscan.io/token/0xcB444e90D8198415266c6a2724b7900fb12FC56E), [Coingecko](https://www.coingecko.com/en/coins/monerium-eur-money))


## Latest deployment

May 5, 2023 deployment to Alfajores: 

- EURMock: https://alfajores.celoscan.io/address/0x4Bc3645dD92c4fE239781040c3594A5cFd088A8F#code 
- gCFA: https://alfajores.celoscan.io/address/0x51F56223Ce239B74540eF20D232624C095eA7Bce#code 

## Versions

- Node [v18.15.0](https://nodejs.org/uk/blog/release/v18.15.0/)
- NPM [v9.5.0](https://github.com/npm/cli/releases/tag/v9.5.0)
- OpenZeppelin Contracts [v4.8.0](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.8.0)

## Support

You can contact me via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discord.com/invite/uSxzJp3J76), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).