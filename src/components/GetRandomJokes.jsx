import React, { useState } from "react";
import { getRandomJokes } from "../services/axiosService";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const GetRandomJokes = () => {
  const [jokes, setJokes] = useState(null);
  const [numberLikes, setNumberLikes] = useState(0);
  const [numberDislikes, setNumberDislikes] = useState(0);
  const [buttonLike, setButtonLike] = useState(null);
  const [vote, setVote] = useState(false);
  const [changeOpinion, setChangeOpinion] = useState(null);

  function obtainJokes() {
    getRandomJokes()
      .then((response) => {
        setJokes(response.data.value);
        setButtonLike(true);
        setVote(true);
      })
      .catch((error) => {
        alert(`Something went wrong: ${error}`);
      });
  }

  function countsLikes() {
    if (vote) {
      setNumberLikes(numberLikes + 1);
      setVote(false);
      setChangeOpinion(false);
      return;
    }

    if (changeOpinion && changeOpinion != null) {
      setNumberLikes(numberLikes + 1);
      setNumberDislikes(numberDislikes - 1);
      setChangeOpinion(false);
    }
  }

  function countsDislikes() {
    if (vote) {
      setNumberDislikes(numberDislikes + 1);
      setVote(false);
      setChangeOpinion(true);
      return;
    }

    if (!changeOpinion && changeOpinion != null) {
      setNumberLikes(numberLikes - 1);
      setNumberDislikes(numberDislikes + 1);
      setChangeOpinion(true);
    }
  }

  return (
    <div>
      <h1> Random Chuck Norris Jokes </h1>
      {jokes != null ? (
        <div>
          <h2> Joke: </h2>
          <p> {jokes} </p>
        </div>
      ) : (
        <p> Please press the button below </p>
      )}

      <Button
        style={{ display: "block", margin: "10px auto" }}
        onClick={obtainJokes}
        variant="contained"
      >
        Show a new joke...
      </Button>

      {buttonLike != null ? (
        <div>
          <div>
            <Button onClick={countsLikes} variant="contained" color="success">
              <FavoriteBorderIcon /> I like it
            </Button>
            <Button onClick={countsDislikes} variant="outlined" color="error">
              <SentimentVeryDissatisfiedIcon /> I don´t like it
            </Button>
          </div>

          <div>
            <h4>
              <ThumbUpIcon />
              You liked a total of {numberLikes} joke
              {numberLikes > 1 ? "s" : ""}
            </h4>

            <h4 style={{ color: "red" }}>
              <ThumbDownAltIcon />
              You disliked a total of {numberDislikes} joke
              {numberDislikes > 1 ? "s" : ""}
            </h4>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default GetRandomJokes;
