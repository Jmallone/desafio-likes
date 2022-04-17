# desafio-likes


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


