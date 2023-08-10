import React, { useState } from "react";
import { ListGroup, Button, Spinner } from "react-bootstrap";
import "./styles.css";

const List = () => {
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepositories = async () => {
    const urlAPI = "https://api.github.com/users/devpass-tech/repos";
    try {
      setIsLoading(true);

      await fetch(urlAPI)
        .then((response) => response.json())
        .then((response) => {
          setRepositories(response);
        });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="list">
      <div className="container">
        <h2 className="title">Devpass Repositories</h2>

        {isLoading ? (
          <Spinner />
        ) : (
          <ListGroup className="repositoriesList">
            {repositories.map((repo) => (
              <ListGroup.Item>{repo.name}</ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Button
          data-testid="button"
          className="button"
          variant="primary"
          onClick={() => fetchRepositories()}
        >
          Fetch repositories
        </Button>
      </div>
    </div>
  );
};

export default List;
