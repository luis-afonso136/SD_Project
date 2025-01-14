### Exemplo de Documentação da API

#### Endpoint: Criar Filmes
- **URL**: `/create-movies`
- **Método**: `POST`
- **Descrição**: Este endpoint permite criar um novo filme no sistema.

**Entrada (Request Body)**:
{
  "title": "Star Wars",
  "director": "George Lucas",
  "price": "20"
}

**Saída (Response)**:
- **Sucesso (201 Created)**:
{
  "movieId": 1,
  "message": "Novo Filme Criado"
}
- **Erro (400 Bad Request)**:
{
   "error": "Um dos campos está a faltar"
}
---

#### Endpoint: Obter Filmes por ID
- **URL**: `/get-movies-byId/{id}`
- **Método**: `GET`
- **Descrição**: Retorna os detalhes de um Filme pelo ID fornecido.

**Entrada (Parâmetros de URL)**:
- **id**: ID do Filme a ser retornado.

**Saída (Response)**:
- **Sucesso (200 OK)**:
{
	"id": 1,
	"title": "Star Wars",
	"director": "George Lucas",
	"price": "20.00"
}
- **Erro (404 Not Found)**:
{
	"error": "Filme não encontrado"
}

---

#### Endpoint: Atualizar Filmes
- **URL**: `/update-movies/{id}`
- **Método**: `PUT`
- **Descrição**: Atualiza os dados de um Filme existente.

**Entrada (Request Body e Parâmetros de URL)**:
- **id**: ID do Filme a ser atualizado.
- **Body**:
{
  "title": "Filme Atualizado",
  "director": "George Lucas",
  "price": "20"
}

**Saída (Response)**:
- **Sucesso (200 OK)**:
{
	"id": 1,
	"title": "Filme Atualizado",
	"director": "George Lucas",
	"price": "20.00"
}
- **Erro (400 Bad Request)**:
{
	"error": "Escreva pelo menos um destes campos (title, director, or price)"
}
- **Erro (404 Not Found)**:
{
	"error": "Filme não encontrado"
}

---

#### Endpoint: Deletar Filmes
- **URL**: `/delete-movies/{id}`
- **Método**: `DELETE`
- **Descrição**: Remove um Filme do sistema.

**Entrada (Parâmetros de URL)**:
- **id**: ID do Filme a ser removido.

**Saída (Response)**:
- **Sucesso (204 No Content)**:
  Não retorna nenhum conteúdo.
- **Erro (404 Not Found)**:
{
	"error": "Filme não encontrado"
}

---

**Observação**: Este exemplo é fornecido como uma sugestão de estrutura para a documentação das APIs. Não é obrigatório seguir exatamente este formato, mas recomenda-se manter clareza e organização similares.