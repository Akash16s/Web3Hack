import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [daoName, setDaoName] = useState("Select");
  const [address, setAddress] = useState("");
  const [github, setGithub] = useState("");
  const [snapshot, setSnapshot] = useState("");
  const [twitter, setTwitter] = useState("");

  const fetchAndSaveData = () => {
    console.log(window.URL);
  };

  useEffect(() => {});

  return (
    <Stack spacing={2} direction="column">
      {" "}
      <Typography variant="h3" style={{ width: "20rem", marginBottom: "1rem" }}>
        Dashboard
      </Typography>
      <Typography variant="h5" style={{ width: "20rem", marginBottom: "1rem" }}>
        Dashboard
      </Typography>
      <Stack spacing={2} direction="row">
        <Stack spacing={2} direction="column">
          asd
        </Stack>{" "}
        <Stack spacing={2} direction="column">
          asd
        </Stack>
      </Stack>
    </Stack>
  );
}
