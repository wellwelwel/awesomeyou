# Guia de Contribuições

Você pode contribuir desde ideias, melhorias no site ou no sistema de pontuações e, claro, incluindo projetos criados ou mantidos por brasileiros na iniciativa.

> [!IMPORTANT]
>
> Obrigado por estar aqui e, naturalmente, seja respeitoso:
>
> - [Código de Conduta](./CODE_OF_CONDUCT.md) 🤝

## Issues _(Bugs)_

Ao abrir um **Issue**, descreva o problema e, sempre que possível, compartilhe uma reprodução básica ou um exemplo visual do problema.

Além de _bugs_, você também pode abrir issues para sugerir ideias e comentar nos que já estão abertos.

## Pull Requests

> [!TIP]
>
> A mensagem final do commit será gerada a partir do título da **Pull Request**, usando a opção “**Squash and Merge**”.

### Incluindo novas pessoas ou projetos

Quer incluir seu projeto ou o de alguém que você conhece? Crie seu **JSON** dinamicamente na página [**Novo Projeto +**](https://awesomeyou.io/new/), siga as instruções na própia página e abra seu **Pull Request**.

> [!IMPORTANT]
>
> - [Regras](./docs/RULES.md) 🧑‍⚖️

### Website

Ao abrir seu **Pull Request**, descreva a solução proposta e o que ela resolve. Caso for uma alteração visual, por favor, compartilhe uma amostra visual.

Você precisará das seguintes ferramentas instaladas em seu sistema:

- [**Node.js**](https://nodejs.org/en/download/package-manager)
- [**WSL**](https://learn.microsoft.com/pt-br/windows/wsl/install) (para usuários **Windows**)

Faça o [ _fork_](https://github.com/wellwelwel/awesomeyou/fork) deste repositório, baixe seu _fork_ localmente e crie uma nova _branch_ a partir da `main`.  
Em seguida, execute `npm ci` para uma instalação limpa da _node_modules_:

```sh
npm ci
```

Em seguida, gere os _assets_ atualizados:

```sh
npm run fetch
```

Para rodar o site localmente, execute:

```sh
npm start
```

Caso queira rodar a suíte de testes localmente, execute:

```sh
npm test
```

Para garantir a integridade da compilação do website, execute:

```sh
npm run build
```

> [!NOTE]
>
> - Por favor, não inclua uma nova _lib_ sem antes discutir a implementação em um Issue dedicado.
> - Não altere o _package-lock.json_ manualmente.
> - As _branches_ [`website`](https://github.com/wellwelwel/awesomeyou/tree/website) e [`server`](https://github.com/wellwelwel/awesomeyou/tree/server) são geradas automaticamente no processo de _deployment_.

---

# Guia para Mantenedores da Awesome You

O cachê global do site é renovado a cada 2 horas. Isso significa que um novo projeto ou mantenedor pode levar até duas horas para aparecer efetivamente no site.

> [!NOTE]
>
> É possível resetar o cachê a qualquer momento executando o workflow [**Purge Cache**](https://github.com/wellwelwel/awesomeyou/actions/workflows/cd_purge.yml).
