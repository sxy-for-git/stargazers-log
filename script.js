const repositoryList = document.querySelector("#repositories");
const status = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list");
    }

    for (const repository of repositories) {
      const item = document.createElement("li");
      item.className = "repository";

      const heading = document.createElement("h2");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;
      heading.append(link);
      item.append(heading);

      const description = document.createElement("p");
      description.textContent = repository.description;
      item.append(description);

      const meta = document.createElement("div");
      meta.className = "repository-meta";
      meta.textContent = `${Number(repository.stars).toLocaleString()} stars · Starred ${repository.starredAt}`;
      item.append(meta);

      repositoryList.append(item);
    }

    status.textContent = repositories.length
      ? `${repositories.length} starred repositories`
      : "No starred repositories yet.";
  } catch (error) {
    status.textContent = "Unable to load starred repositories. Please try again later.";
    console.error(error);
  }
}

loadRepositories();
