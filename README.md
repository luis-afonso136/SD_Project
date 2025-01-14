# SD_Project

Este projeto é uma aplicação distribuída que implementa uma API RESTful utilizando os conceitos fundamentais de sistemas distribuídos. O sistema foi projetado para ser executado em containers Docker e está documentado para facilitar seu uso.

---

## Informações Acadêmicas

- **Unidade Curricular**: Serviços Distribuídos
- **Professor**: Wenderson Wanzeller
- **Aluno**: Maria Conceição
- **Aluno**: Luis Afonso
- **Matrícula**: [Número de Matrícula]
- **Ano Letivo**: 2024/2025
- **Instituição de Ensino**: IPVC ESTG

---

## Funcionalidades

- API RESTful com suporte aos métodos HTTP: GET, POST, PUT, DELETE.
- Versionamento do código no GitHub com branches para desenvolvimento e produção.
- Imagem Docker publicada no Docker Hub.
- Documentação da API no arquivo API.md.
- Arquivo de coleção do Postman disponível no repositório.

---

## Requisitos

Para executar este sistema, você precisará dos seguintes itens instalados:

- Docker (versão atualizada).
- Git.
- Postman (opcional, para testar as rotas da API).

---

## Como Executar

### Passo 1: Clonar o Repositório

Execute o comando abaixo para clonar o repositório do GitHub:

```bash
git clone https://github.com/luis-afonso136/SD_Project
```

Acesse o diretório do projeto:
```bash
cd SD_Project
```
---

### Passo 2: Executar a Aplicação com Docker

Certifique-se de que o Docker está em execução e utilize o comando abaixo para construir e executar a aplicação:
```bash
docker-compose up
```
Isso iniciará a aplicação e ela estará disponível no endereço: http://localhost:8080.

---

### Passo 3: Testar as Rotas da API

A API pode ser testada utilizando ferramentas como o Postman. Todas as rotas e detalhes de requisição estão documentados no arquivo API.md. Além disso, você pode importar o arquivo de coleção do Postman incluído no repositório para facilitar os testes.

---

## Imagem Docker

A imagem Docker da aplicação foi publicada no Docker Hub e pode ser baixada diretamente com o comando:
```bash
docker pull <seu-username>/<nome-da-imagem>
```
---

## Estrutura do Repositório

- API.md: Documentação detalhada das rotas da API.
- docker-compose.yml: Configuração para executar a aplicação em containers Docker.
- postman_collection.json: Arquivo de coleção do Postman para facilitar os testes.
- src/: Código-fonte da aplicação.

---

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais informações.