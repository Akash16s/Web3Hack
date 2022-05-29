import { Stack, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Dashboard() {
  const [nameOfDao, setNameofDao] = useState("");
  const { id } = useParams();
  const [docId, setDocId] = useState("");

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const [userList, setUserList] = useState([]);
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
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

  useEffect(() => {
    getTheDao();
    getTheUser();
  });

  return (
    <Stack spacing={2} direction="column">
      {" "}
      <Typography variant="h3" style={{ width: "20rem", marginBottom: "1rem" }}>
        Dashboard
      </Typography>
      <Typography variant="h5" style={{ width: "20rem", marginBottom: "1rem" }}>
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
  );
}
