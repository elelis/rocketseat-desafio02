const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

// const repositories = [];

const repositories = 
[
  {
    "id": "7cdfd6ce-c10c-4879-9d61-e764662df119",
    "title": "Desafio 2 novo",
    "url": "https://github.com/elelis/rocketseat-desafio02.git",
    "techs": [
      "Node.js",
      "PHP",
      "React"
    ],
    "likes": 0
  }
]

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repository = 
    {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
    };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  
  const repositoryIndex = repositories.findIndex(repo=>repo.id === id);
  
  if(repositoryIndex<0){
    return response.status(400).json({error:"Não encontrado"});
  }

  const {likes} = repositories[repositoryIndex];

  const repository = 
    {
      id,
      title,
      url,
      techs,
      likes
    };
  
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  const repositoryIndex = repositories.findIndex(repo=>repo.id === id);

  if(repositoryIndex<0){
    return response.status(400).json({error:"Não encontrado"});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  
  const repositoryIndex = repositories.findIndex(repo=>repo.id === id);

  if(repositoryIndex<0){
    return response.status(400).json({error:"Não encontrado"});
  }

  const {title, url, techs , likes} = repositories[repositoryIndex];

  const repository = {
    id, title, url, techs, 'likes': likes + 1
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;
