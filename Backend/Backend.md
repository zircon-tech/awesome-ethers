# Backend

## Overview 

Usually you will want to implement ethers in the backend for implementing some bussiness logic, to have certaing validations, more control in the application using blockchain, is also useful for analyze events or data. 

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You will need a JS package manager. 

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
In order to interact with an EVM blockchain you will need a provider, get a free Provider API Key at one of these options: 
- [INFURA](https://app.infura.io/)
- [ALCHEMY](https://dashboard.alchemy.com/)
- For other options available please refer to: [PROVIDERS](https://github.com/ethers-io/ethers.js/#providers)

#### Clone the repo 
1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a .env file from .env.example and replace the environment variables. 
#### Setup from scratch 

1. Set new project
   ```sh
   npm init 
   ```
2. Install NPM packages
   ```sh
   npm install ethers
   npm install -D typescript
   npm install -D ts-node
   ```
3. Set your environment variables
   ```.env
   PROVIDER_API_KEY = 'ENTER YOUR API'
   PRIVATE_KEY = 'ENTER YOUR PRIVATE KEY'
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

In example folder you will see several examples. for running any of those: 

   ```sh
   ts-node examples/example.ts
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>
