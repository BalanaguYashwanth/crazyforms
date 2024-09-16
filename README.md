# FormPilot (aka crazyforms)

    - Powered with MultiChain + Escrow + Rewards + LLM

# Tech stack

    - Frontend
        - Yarn, Scss, Js, REACTJS
    - Backend
        - Nestjs, Postgresql
    - Chains
        - Eth, KiiChain, SUI

# Project structure

    FormPilot
    ├── apps
    │   ├── frontend
    │   │   ├── app1
    │   |   |    ├── chains/
    |   |   |    │   ├── EVM/
    |   |   |    │   └── NonEVM/
    |   |   |    |   └── ...
    |   |   |    ├── components/
    |   |   |    │   └── ...
    |   |   |    ├── common/
    |   |   |    └── ...
    │   │   ├── app2
    │   │   └── ...
    │   ├── backend/
    │   │   ├── api1/
    │   │   ├── api2/
    │   │   └── ...
    ├── package.json
    └── tsconfig.base.json

# Contracts 

Non EVM - SUI - https://github.com/BalanaguYashwanth/crazyforms_sui

EVM - KiiChain - https://github.com/BalanaguYashwanth/Kiichain-forms-escrow