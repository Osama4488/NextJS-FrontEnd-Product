// Frontend code (TextGenerator.js)

import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Container } from "@mui/material";
import parser from "html-react-parser";

const TextGenerator = () => {
  const [response, setResponse] = useState("");
  const [promptText, setPromptText] = useState("");
  const [messages, setMessages] = useState("");
  const [loading, setLoading] = useState(false);
  // const handleSubmit = async () => {
  //   try {
  //     const apiKey = "AIzaSyCTMc8pntwJmyEftgYmUisSA9-ARqSRyqk";
  //     const apiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

  //     const requestBody = {
  //       prompt: {
  //         text: promptText,
  //       },
  //     };

  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     const data = await response.json();
  //     const cleanOutput = cleanUpOutput(data.candidates[0].output);
  //     console.log(data, "data");
  //     // setResponse(cleanOutput);
  //     setResponse((prevResponses) => [...prevResponses, cleanOutput]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setResponse("Error fetching data");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages("");
    setLoading(true);

    try {
      const apiKey = "AIzaSyCTMc8pntwJmyEftgYmUisSA9-ARqSRyqk";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;

      const requestBody = {
        prompt: {
          text: promptText,
        },
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      const output = responseData.candidates[0].output;
      console.log(output, "output");

      // const reader = response.body
      //   .pipeThrough(new TextDecoderStream())
      //   .getReader();
      // console.log(reader, "reader");

      // while (true) {
      //   const { value, done } = await reader.read();
      //   if (done) {
      //     setLoading(false);
      //     break;
      //   }
      //   console.log("Received: ", value);
      //   const cleanedOutput = cleanUpOutput(value.candidates[0].output);
      //   setMessages((prevMessages) => prevMessages + cleanedOutput);

      // }
      const cleanedOutput = cleanUpOutput(output);
      setMessages((prevMessages) => prevMessages + cleanedOutput);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setMessages("Error fetching messages");
    }
  };

  const cleanUpOutput = (output) => {
    // Remove code block delimiters ("```") from start and end of the output
    let cleanedOutput = output.replace(/^```([^]*)```$/, "$1");
    // Replace escaped characters with their actual representation
    cleanedOutput = cleanedOutput.replace(/\\n/g, "\n");
    // Trim leading and trailing whitespace
    cleanedOutput = cleanedOutput.trim();
    return cleanedOutput;
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Text Generator
      </Typography>
      <TextField
        label="Enter prompt text"
        variant="outlined"
        fullWidth
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Generate Text
      </Button>
      <Paper elevation={3} style={{ marginTop: "16px", padding: "16px" }}>
        <Typography variant="body1">
          {/* {response} */}
          {parser(messages)}
        </Typography>
      </Paper>
    </Container>
  );
};

export default TextGenerator;
