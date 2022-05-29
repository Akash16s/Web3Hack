import { Button, Stack, TextField, Typography } from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../auth";
import "./dao.css";

function Settings() {
  const [nameOfDao, setNameofDao] = useState("");
  const { id } = useParams();
  const [docId, setDocId] = useState("");

  const [gitCodeCotri, setGitCodeContri] = useState(10);
  const [snapshot, setSnapshots] = useState(10);
  const [Twitter, setTwitter] = useState(10);
  const [EarlyAdoption, setEarlyAdoption] = useState(10);
  const [ActiveUser, setActiveUser] = useState(10);
  const [TokenLoyalty, setTokenLoyalty] = useState(10);
  const [LPSupplier, setLPSupplier] = useState(10);

  const getTheDao = async () => {
    const q = query(collection(db, "Dao"), where("daoName", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      setNameofDao(data.daoName);
      setDocId(doc.id);
    });
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    await updateDoc(doc(db, "Dao", docId), {
      gitCodeCotri,
      snapshot,
      Twitter,
      EarlyAdoption,
      ActiveUser,
      TokenLoyalty,
      LPSupplier,
    });
    setIsSubmitted(true);
  };

  useEffect(() => {
    getTheDao();
  });

  return (
    <Stack
      spacing={2}
      direction="column"
      style={{ width: "50%", marginBottom: "1rem", marginLeft: "5rem" }}
    >
      <Typography
        variant="h4"
        style={{ width: "20rem", marginBottom: "1rem", marginLeft: "5rem" }}
      >
        Current Dao:<b> {nameOfDao}</b>
      </Typography>
      <div className="grid">
        <h3>Git Code Contribution</h3>{" "}
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          style={{ width: "3rem", marginLeft: "5rem" }}
          onChange={(e) => {
            setGitCodeContri(e.target.value);
          }}
        />{" "}
        /10
      </div>
      <div className="grid">
        <h3>Snapshot Participation</h3>{" "}
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          style={{ width: "3rem", marginLeft: "5rem" }}
          onChange={(e) => {
            setSnapshots(e.target.value);
          }}
        />{" "}
        /10
      </div>
      <div className="grid">
        <h3>Twitter Engagement</h3>{" "}
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          style={{ width: "3rem", marginLeft: "5rem" }}
          onChange={(e) => {
            setTwitter(e.target.value);
          }}
        />{" "}
        /10
      </div>
      <div className="grid">
        <h3>Early Adoption</h3>{" "}
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          style={{ width: "3rem", marginLeft: "5rem" }}
          onChange={(e) => {
            setEarlyAdoption(e.target.value);
          }}
        />{" "}
        /10
      </div>
      <div className="grid">
        <h3>Active User</h3>{" "}
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          style={{ width: "3rem", marginLeft: "5rem" }}
          onChange={(e) => {
            setActiveUser(e.target.value);
          }}
        />{" "}
        /10
      </div>
      <div className="grid">
        <h3>Token Loyalty</h3>{" "}
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          style={{ width: "3rem", marginLeft: "5rem" }}
          onChange={(e) => {
            setTokenLoyalty(e.target.value);
          }}
        />{" "}
        /10
      </div>
      <div className="grid">
        <h3>Liqudity Provider</h3>{" "}
        <TextField
          id="filled-basic"
          variant="filled"
          size="small"
          style={{ width: "3rem", marginLeft: "5rem" }}
          onChange={(e) => {
            setLPSupplier(e.target.value);
          }}
        />{" "}
        /10
      </div>

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
  );
}

export default Settings;
