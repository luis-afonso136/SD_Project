# Dockerfile para o backend Node.js
FROM node:18-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar os arquivos da aplicação
COPY package*.json ./ 
COPY index.js ./ 

# Instalar dependências
RUN npm install

# Expor a porta
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["node", "index.js"]
