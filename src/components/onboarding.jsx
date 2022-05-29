import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../auth";
import { ethers } from "ethers";

function OnBoarding() {
  const [daoList, setDaoList] = useState([]);
  const [daoName, setDaoName] = useState("");
  const [address, setAddress] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [Discord, setDiscord] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchDao = async () => {
    const querySnapshot = await getDocs(collection(db, "Dao"));
    let tempList = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tempList.push(data.daoName);
    });
    setDaoList(tempList);
  };

  const submit = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "users"), {
      daoName,
      address,
      github,
      twitter,
      Discord,
    });
    setIsSubmitted(true);
  };

  const callMetamask = async (event) => {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setAddress(await signer.getAddress());
  };

  useEffect(() => {
    fetchDao();
  }, []);

  return (
    <Stack spacing={2} direction="column">
      <Typography
        style={{ width: "20rem", marginBottom: "1rem", marginLeft: "5rem" }}
        variant="h3"
      >
        Welcome!!
      </Typography>{" "}
      <Typography
        style={{ width: "20rem", marginBottom: "1rem", marginLeft: "5rem" }}
        variant="h5"
      >
        Kindly Select the following
      </Typography>
      <FormControl style={{ width: "20rem", marginBottom: "1rem" }}>
        <InputLabel
          style={{ width: "20rem", marginLeft: "5rem" }}
          id="demo-simple-select-label"
        >
          Dao's Name
        </InputLabel>
        <Select
          style={{ width: "20rem", marginLeft: "5rem" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="filled"
          value={daoName}
          label="Dao's Name"
          onChange={(e) => {
            setDaoName(e.target.value);
          }}
        >
          {daoList.map((e) => {
            return <MenuItem value={e}>{e}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <TextField
        id="filled-basic"
        label="Github"
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
        label="Discord"
        variant="filled"
        size="small"
        style={{ width: "20rem", marginLeft: "5rem" }}
        onChange={(event) => {
          setDiscord(event.target.value);
        }}
      />{" "}
      <Button
        variant="contained"
        style={{ width: "20rem", marginLeft: "5rem" }}
        onClick={callMetamask}
        color="secondary"
      >
        Metamask Wallet
      </Button>
      {address !== "" ? <p>Selected Address {address}</p> : null}{" "}
      <Button
        variant="contained"
        style={{ width: "20rem", marginLeft: "5rem" }}
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

export default OnBoarding;
