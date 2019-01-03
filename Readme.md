# *Decentralized Star Notary Project* 

*This Project is about build a star notary applicaton and deploy it to a test network of ethereum. This project would help in getting hands on with the most of the latest tools that are used by a developer*

## Setup 

Some of the Steps to get started with the project:

1. Installing Truffle globally

```
npm install -g truffle

```

2. Create a project working directory and cd into it. 

3. Initializing the working directory

```
truffle init

```

4. Create an Account in Infura to get access to different test netowrks and we are going to use Rinkeby Test Network. 

5. Install ganache-cli tools globally 

```
npm install -g ganache-cli

```
6. Initialize the ganache in command line

```
ganache-cli

```
8. Take the first address from the ganache termianl and then request play ether in the following link https://faucet.rinkeby.io/

7. Few variables to Customize to use this application. 

Update .env file with your variables. 

MNEMONIC=Your Mnemonic from ganache initialized terminal. 
ENDPOINT_KEY=Key from infura 

8. Star Notary test update the Contract address and rinkeby url. 


That's it you can also deploy this network with your own wallet address. 

Some of the helpful resouces that I used to finish the project. 

1. Udacity Test Material. 
2. https://github.com/ibrunotome/
3. https://github.com/ashishnitinpatil
4. https://blog.abuiles.com/blog/2017/07/09/deploying-truffle-contracts-to-rinkeby/