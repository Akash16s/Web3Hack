import {
  Button,
  Paper,
  Stack,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  const [userList, setUserList] = useState([]);

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

  const getTheUser = async () => {
    const q = query(collection(db, "users"), where("daoName", "==", id));
    const querySnapshot = await getDocs(q);
    let tempList = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data();
      tempList.push(data);
    });
    setUserList(tempList);
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
    getTheUser();
  });

  return (
    <Stack
      spacing={2}
      direction="column"
      style={{
        width: "50%",
        marginBottom: "1rem",
        marginLeft: "35%",
        alignContent: "center",
      }}
    >
      <Typography
        variant="h4"
        style={{ width: "40rem", marginBottom: "1rem", marginLeft: "5rem" }}
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

      <Stack
        spacing={2}
        direction="column"
        style={{ width: "70rem", marginBottom: "1rem", marginLeft: "-20rem" }}
      >
        {" "}
        <Typography
          variant="h3"
          style={{ width: "20rem", marginBottom: "1rem" }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="h5"
          style={{ width: "20rem", marginBottom: "1rem" }}
        >
          Dao: <b>{nameOfDao}</b>
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ background: "#DADADA" }}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Git Code Contribution</TableCell>
                <TableCell align="right">Snapshot Voting</TableCell>
                <TableCell align="right">Twitter Activity</TableCell>
                <TableCell align="right">Early Adoption</TableCell>
                <TableCell align="right">Active User</TableCell>{" "}
                <TableCell align="right">Token Loyalty</TableCell>
                <TableCell align="right">LP Supplies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.twitter}
                  </TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                  <TableCell align="right">0</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}

export default Settings;
