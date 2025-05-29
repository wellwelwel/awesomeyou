# Sistema de Pontos

Diferente da metrificação por popularidade (**100** ou **1.000** estrelas de um repositório), o sistema de pontos visa valorizar e humanizar o trabalho de mantenedores brasileiros no ecossistema _open source_, equilibrando criação de comunidade, impacto, consistência e popularidade de forma justa.

Projetos que atinjam **200** pontos ou mais podem entrar na iniciativa, desde que respeitem as [regras](https://github.com/wellwelwel/awesomeyou/issues/2).

## Por que essa barreira inicial existe?

Majoritariamente, para garantir a qualidade e relevância dos projetos e seus respectivos mantenedores.

Por exemplo, um projeto com poucas estrelas, mas que tenha contribuições de outras pessoas (senso de comunidade), _forks_, instalações ou downloads e sendo bem mantido, pode facilmente superar a barreira de **200** pontos, ao invés de ser medido unicamente por estrelas (popularidade).

<details>
<summary><b>💡 EXEMPLOS</b></summary>

<br />

Projeto com uma comunidade forte:

- Com **15** colaboradores, **0** instalações ou downloads, **20** forks, **55** estrelas, **5** issues abertas e **45** issues fechadas conseguiria quebrar a barreira dos **200** pontos.

Projeto com alto impacto, mas baixa popularidade:

- Com **6** colaboradores, **20.000** instalações ou downloads mensais, **3** forks, **16** estrelas, **0** issues abertas, **28** issues fechadas e **200** dependências diretas do repositório conseguiria quebrar a barreira dos **200** pontos.

**Como é possível um projeto ter tantos downloads e não ser popular?**

Projetos podem ser adotados por projetos maiores como dependências diretas, se tornando críticos para o funcionamento do seu respectivo ecossistema, _você mesmo pode usá-los nesse exato momento, mas não sabe que eles existem._

Para um projeto que dependa exclusivamente da popularidade, ele precisaria obter no mínimo **200** estrelas e **0** Issues abertas ou **200** estrelas adicionais para cada ano sem manutenção, garantindo o equilíbrio da pontuação.

</details>

---

## Tipos de Pontuação

- As pontuações são calculadas diariamente e projetos que não baterem no mínimo **200** pontos precisão ser removidos, garantindo a qualidade e relevância dos projetos de forma contínua.
- A comunidade pode votar para remover um projeto mesmo que ele possua uma boa pontuação. Para isso, abra uma Issue justificando suas motivações e, se até um mês ela alcançar até 10 upvotes (👍) a mais que downvotes (👎), um dos mantenedores irá remover o projeto. Caso contrário, a Issue será fechada como não planejada e o projeto será mantido.

<details>
<summary><b>🤝 COMUNIDADE</b></summary>

<br />

As pontuações por senso de comunidade envolvem números de colaboradores com _commits_ na _branch_ principal do repositório e também através da intenção de contribuição _(forks)_:

- Cada colaborador com _commits_ na _branch_ principal equivale a **5** pontos.
  - Atualmente, essa conta também inclui _bots_, não por intenção, mas por limitação de automação.
- Cada intenção de contribuição _(forks)_ equivalem a **2** pontos.
- É obrigatório que o projeto tenha uma licença transparente e identificada pelo **GitHub**.

</details>

<details>
<summary><b>🚀 IMPACTO</b></summary>

<br />

As pontuações com base em impacto são baseadas na quantidade de dependentes diretos do repositório e em números de instalações ou downloads:

- Cada **10** dependentes diretos equivalem a **4** pontos, limitado a 50% da pontuação acumulada.
- Métricas que podem ser medidas mensalmente valem **3** pontos a cada **1.000** downloads mensais.
- Métricas que não podem ser medidas por períodos valem **2** pontos a cada **2.000** downloads ou instalações totais.

**Por que um intervalo tão grande de downloads ou instalações?**

- Instalações e downloads podem ser feitos por _bots_ ou automações e não dependem de uma pessoa real.
- Esses números podem ser facilmente manipulados, mesmo quando não é a intenção (como em múltiplas matrizes recursivas em testes automatizados — CI/CD).
- Como cada cenário envolve métricas muito difíceis de serem validadas humanamente e muito improváveis de serem automatizadas, esse foi um valor considerado justo.

**Por que downloads totais valem menos que downloads mensais?**

- Instalações e downloads mensais garantem que um projeto mantém seu impacto de forma recorrente e atual, sendo atualizados diariamente.
- Instalações e downloads totais não são passíveis de métricas por período. Por exemplo, um projeto que deixou de ser mantido há anos com milhares de downloads antigos, mas nenhum download atual.

</details>

<details>
<summary><b>⚙️ MANUTENÇÃO</b></summary>

<br />

Baixa manutenção pode penalizar a pontuação, assim como uma boa manutenção de um projeto pode aumentar ainda mais a pontuação:

- Cada Issue aberta penaliza **1** ponto.
- Cada Issue fechada/resolvida equivale a **2** pontos, limitado a 50% da pontuação acumulada.
- Projetos sem atividade _(commits)_ a partir de dois anos são penalizados com **200** pontos progressivamente para cada ano sem atividade e, nesse caso, para cada Issue aberta são penalizados **2.000** pontos.

Isso ajuda a filtrar projetos com altas pontuações que não são mais mantidos e não possuem expectativa de dar suporte aos usuários, mas sem penalizar de forma injusta projetos estáveis que não precisam de manutenção recorrente.

</details>

<details>
<summary><b>🌟 POPULARIDADE</b></summary>

<br />

A popularidade de um projeto é medida com base nas estrelas do repositório, mas não é um requerimento:

- Cada estrela no repositório vale **1** ponto.

Um projeto com **0** estrelas, mas um grande número instalações e downloads ou uma comunidade fortemente estabelecida com diversas contribuições externas e bem mantido pode facilmente ultrapassar um projeto que tenha **100** estrelas ou mais, mas nenhum outro fator das pontuações.

Isso evita que projetos que não são mantidos ou que se baseiam unicamente na popularidade do criador, não comprometam a qualidade e relevância dos projetos na iniciativa.

</details>
