import React, { useState } from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import bgImage from "../assets/img/banner-bg.png";

const FAQComponent = () => {
  const [selected, setSelected] = useState("Eligibility");

  const content = {
    Eligibility:
      "No prior experience is required. This program is suitable for all levels.",
    "How to Use":
      "Follow the guided process after selecting your preferred option.",
    "Terms & Conditions":
      "Users must adhere to the policies and terms of the program.",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Background Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)", // Dark overlay for readability
        }}
      />

      {/* FAQ Section */}
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          display: "flex",
          width: "70%",
          maxWidth: "800px",
          backgroundColor: "rgba(18, 18, 18, 0.9)",
          padding: "20px",
          borderRadius: "12px",
          zIndex: 1,
        }}
      >
        {/* Left Side Buttons */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "35%" }}>
          {Object.keys(content).map((item) => (
            <Button
              key={item}
              onClick={() => setSelected(item)}
              sx={{
                background: selected === item ? "linear-gradient(135deg, #800080, #FF1493)" : "#222",
                color: "#fff",
                padding: "10px",
                fontSize: "14px",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>

        {/* Right Side Content */}
        <Box sx={{ width: "65%", paddingLeft: "20px" }}>
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h6" sx={{ marginBottom: "8px", color: "#FF69B4" }}>
              {selected}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#ccc" }}>
              {content[selected]}
            </Typography>
          </motion.div>
        </Box>
      </Paper>

      {/* Get in Touch Section */}
      <Paper
        elevation={3}
        sx={{
          marginTop: "20px",
          width: "70%",
          maxWidth: "800px",
          backgroundColor: "rgba(18, 18, 18, 0.9)",
          padding: "15px 20px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ContactSupportIcon sx={{ fontSize: 30, color: "#FF69B4" }} />
          <Typography sx={{ fontSize: "14px", color: "#ccc" }}>
            Need more details? Reach out to our support team.
          </Typography>
        </Box>
        <Button
          sx={{
            background: "linear-gradient(135deg, #800080, #FF1493)",
            color: "#fff",
            padding: "8px 16px",
            fontSize: "14px",
            borderRadius: "6px",
            "&:hover": { backgroundColor: "#FF1493" },
          }}
        >
          Get in Touch
        </Button>
      </Paper>
    </Box>
  );
};

export default FAQComponent;
