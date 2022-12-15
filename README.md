# desafio-likes

## Como instalar as dependencias

```bash
npm install
```

ou 

```bash
yarn
```

### Modificar o .env
```
NODE_ENV=dev
PORT=50
SECRET=

HOST_DB=localhost
PORT_DB=7557
USER_DB=postgres
PASSWORD_DB=
DATABASE_DB=
```

e o 

`ormconfig.json`` tambem


### Executar

```bash
npm run dev
```

### Migrations

## Gerar

> Gerar para o ambiente de produção

```bash
yarn typeorm migration:generate -n prod
```

> Gerar para o ambiente de teste

```bash
yarn typeorm migration:generate -n teste -c test
```

## Rodar
> Rodar Migration:

```bash
$ yarn typeorm migration:run
```


