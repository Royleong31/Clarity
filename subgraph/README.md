# Clarity subgraph

### Note on Preparation:

To generate built schemas and artifacts:

```bash
yarn codegen
```

## Local Deployment

2. start graph node (remove previous data if there is any)

```bash
docker compose up
```

3. create and deploy graph instance

```bash
npm run create-local
npm run deploy-local
```

Then should be able to see data at [http://localhost:8000/subgraphs/name/uniswap-v4](http://localhost:8000/subgraphs/name/uniswap-v4)

## Live Deployment

To prepare the workspace for a given network run:

```bash
yarn prepare:<network>
```

Run this command to deploy live to The Graph:

```bash
export SUBGRAPH_ACCESS_KEY=<your-access-key>
yarn deploy:<network>
```
