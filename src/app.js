const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", async (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", async (request, response) => {
  const { url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", async (request, response) => {
  const { id } = request.params;

  const currentIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (currentIndex === -1) {
    return response.status(400).json("repository does not exist.");
  }

  const { url, title, techs } = request.body;

  repositories[currentIndex].url = url;
  repositories[currentIndex].title = title;
  repositories[currentIndex].techs = techs;

  return response.json(repositories[currentIndex]);
});

app.delete("/repositories/:id", async (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index === -1) {
    return response.status(400).json("repository that not exist.");
  }

  repositories.splice(index, 1);

  return response.status(204).json({});
});

app.post("/repositories/:id/like", async (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index === -1) {
    return response.status(400).json({});
  }

  repositories[index].likes = repositories[index].likes + 1;

  return response.json(repositories[index]);
});

module.exports = app;
