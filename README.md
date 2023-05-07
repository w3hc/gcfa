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

0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73 ([Celoscan](https://celoscan.io/token/0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73), [Coingecko](https://www.coingecko.com/en/coins/celo-euro))


## Latest deployment

May 7, 2023 deployment to Alfajores: 

- EURMock: https://alfajores.celoscan.io/address/0x43E03660DEc265CE99d2AD047f34368954f5446A#code 
- gCFA: https://alfajores.celoscan.io/address/0xBd267B7ce31B493f6Dec14501ac28c896763C237#code
- DAO: https://alfajores.celoscan.io/address/0x020b796c418c363be5517c6febff5c5a9248f763#code
  
May 5, 2023 deployment to Alfajores: 

- EURMock: https://alfajores.celoscan.io/address/0x4Bc3645dD92c4fE239781040c3594A5cFd088A8F#code 
- gCFA: https://alfajores.celoscan.io/address/0x51F56223Ce239B74540eF20D232624C095eA7Bce#code 

## Versions

- Node [v18.15.0](https://nodejs.org/uk/blog/release/v18.15.0/)
- NPM [v9.5.0](https://github.com/npm/cli/releases/tag/v9.5.0)
- OpenZeppelin Contracts [v4.8.0](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v4.8.0)

## Support

You can contact me via [Element](https://matrix.to/#/@julienbrg:matrix.org), [Telegram](https://t.me/julienbrg), [Twitter](https://twitter.com/julienbrg), [Discord](https://discord.com/invite/uSxzJp3J76), or [LinkedIn](https://www.linkedin.com/in/julienberanger/).