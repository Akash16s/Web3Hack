import { Stack, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { db } from "../auth";
import { addDoc, collection } from "firebase/firestore";

export default function Dao() {
  const [daoName, setDaoName] = useState("Select");
  const [address, setAddress] = useState("");
  const [github, setGithub] = useState("");
  const [snapshot, setSnapshot] = useState("");
  const [twitter, setTwitter] = useState("");
  const [chainId, setChainId] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "Dao"), {
      daoName,
      address,
      github,
      twitter,
      snapshot,
      chainId,
    });
    setIsSubmitted(true);
  };

  return (
    <Stack spacing={2} direction="column">
      <Typography
        variant="h3"
        style={{ width: "20rem", marginBottom: "1rem", marginLeft: "5rem" }}
      >
        Dao Entry
      </Typography>
      <Stack spacing={2} direction="column">
        <TextField
          id="filled-basic"
          label="Dao's Name"
          variant="filled"
          size="small"
          style={{ width: "20rem", marginLeft: "5rem" }}
          onChange={(event) => {
            setDaoName(event.target.value);
          }}
        />
        <TextField
          id="filled-basic"
          label="Comma seperated Token Addresses"
          variant="filled"
          size="small"
          style={{ width: "20rem", marginLeft: "5rem" }}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <TextField
          id="filled-basic"
          label="Comma Seperated Git Repo URL"
          variant="filled"
          size="small"
          style={{ width: "20rem", marginLeft: "5rem" }}
          onChange={(event) => {
            setGithub(event.target.value);
          }}
        />{" "}
        <TextField
          id="filled-basic"
          label="Twitter"
          variant="filled"
          size="small"
          style={{ width: "20rem", marginLeft: "5rem" }}
          onChange={(event) => {
            setTwitter(event.target.value);
          }}
        />{" "}
        <TextField
          id="filled-basic"
          label="Snapshot User Name"
          variant="filled"
          size="small"
          style={{ width: "20rem", marginLeft: "5rem" }}
          onChange={(event) => {
            setSnapshot(event.target.value);
          }}
        />{" "}
        <TextField
          id="filled-basic"
          label="Chain Id"
          variant="filled"
          size="small"
          style={{ width: "20rem", marginLeft: "5rem" }}
          onChange={(event) => {
            setChainId(event.target.value);
          }}
        />{" "}
        <Button
          style={{ width: "5rem", marginLeft: "10rem" }}
          variant="contained"
          onClick={submit}
        >
          Submit
        </Button>
        {isSubmitted ? (
          <p style={{ color: "red", width: "10rem", marginLeft: "10rem" }}>
            Submission Complete
          </p>
        ) : null}
      </Stack>
    </Stack>
  );
}
