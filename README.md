## Clarity ETH SG 


```
PGPASSWORD=postgres psql -h 127.0.0.1 -U postgres -p 5432 -c 'DROP DATABASE main';
PGPASSWORD=postgres psql -h 127.0.0.1 -U postgres -p 5432 -c 'CREATE DATABASE main';
pnpm migration:run
```
