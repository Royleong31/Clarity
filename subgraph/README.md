# Clarity subgraph

Clarity utilises The Graph Protocol for real-time blockchain data indexing across its core `Clarity.sol` and `ClaritySPHook.sol` custom hook implementation integrated with Sign Protocol's `SP.sol` main instance.

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

Then should be able to see data at [http://localhost:8000/subgraphs/name/clarity](http://localhost:8000/subgraphs/name/clarity)

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

## Deployed Subgraph URLs

### Base Sepolia

- Name: `clarity-base-sepolia`
- Latest Version: `v0.0.2`

```
https://api.studio.thegraph.com/query/46716/clarity-base-sepolia/version/latest
```

#### Example Usage

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ attestationInfos(first: 5) { id reviewAttestationId nullifierHash revoked } bundles(first: 5) { id syncingIndex } }", "operationName": "Subgraphs", "variables": {}}' \
  https://api.studio.thegraph.com/query/46716/clarity-base-sepolia/version/latest
```

### Sepolia

- Name: `clarity-test`
- Latest Version: `v0.1.6`

```
https://api.studio.thegraph.com/query/46716/clarity-test/version/latest
```

#### Example Usage

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ attestationInfos(first: 5) { id reviewAttestationId nullifierHash revoked } bundles(first: 5) { id syncingIndex } }", "operationName": "Subgraphs", "variables": {}}' \
  https://api.studio.thegraph.com/query/46716/clarity-test/version/latest
```
