import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
} from "@mui/material";

import ReferralForm from "./ReferralForm";

const programs = [
  { name: "Professional Certificate Program in Product Management", referrerBonus: "₹ 7,000", refereeBonus: "₹ 9,000" },
  { name: "PG Certificate Program in Strategic Product Management", referrerBonus: "₹ 9,000", refereeBonus: "₹ 11,000" },
  { name: "Executive Program in Data Driven Product Management", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
  { name: "Executive Program in Product Management and Digital Transformation", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
  { name: "Executive Program in Product Management", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
  { name: "Advanced Certification in Product Management", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
  { name: "Executive Program in Product Management and Project Management", referrerBonus: "₹ 10,000", refereeBonus: "₹ 10,000" },
];

const categories = [
  "All Programs",
  "Product Management",
  "Strategy & Leadership",
  "Business Management",
  "Fintech",
  "Senior Management",
  "Data Science",
  "Digital Transformation",
  "Business Analytics",
];

const ReferralBenefits = () => {
  const [enrolled, setEnrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#121212", color: "#fff", p: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}>
        What Are The <span style={{ background: "linear-gradient(90deg, #a100ff, #ff0080)", WebkitBackgroundClip: "text", color: "transparent" }}>Referral Benefits?</span>
      </Typography>

      <Grid container spacing={3}>
        {/* Sidebar - Adjusted width */}
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: "#1E1E1E", p: 3, borderRadius: 2, height: "100%", minHeight: "400px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Programs</Typography>
            <List>
              {categories.map((category, index) => (
                <ListItem
                  key={index}
                  component="button"
                  sx={{
                    borderRadius: 1,
                    bgcolor: index === 0 ? "linear-gradient(90deg, #a100ff, #ff0080)" : "transparent",
                    color: index === 0 ? "#fff" : "#aaa",
                    mb: 1,
                    "&:hover": { bgcolor: "#333" },
                  }}
                >
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Enrolled Toggle */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 2 }}>
            <Typography variant="body1">Enrolled</Typography>
            <Switch checked={enrolled} onChange={() => setEnrolled(!enrolled)} />
          </Box>

          {/* Referral Table - Ensuring Proper Alignment */}
          <TableContainer component={Paper} sx={{ bgcolor: "#1E1E1E", borderRadius: 2, overflow: "hidden", mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#333" }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold", py: 2 }}>Programs</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold", py: 2 }}>Referrer Bonus</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold", py: 2 }}>Referee Bonus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {programs.map((program, index) => (
                  <TableRow key={index} sx={{ "&:hover": { bgcolor: "#222" } }}>
                    <TableCell sx={{ color: "#ddd", py: 1.5 }}>{program.name}</TableCell>
                    <TableCell sx={{ color: "#ddd", py: 1.5 }}>{program.referrerBonus}</TableCell>
                    <TableCell sx={{ color: "#ddd", py: 1.5 }}>{program.refereeBonus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Show More Button - Aligned Below Table (Right) */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #a100ff, #ff0080)",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                "&:hover": { background: "linear-gradient(90deg, #8900cc, #cc0066)" },
              }}
            >
              Show More
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ bgcolor: "#444", my: 4 }} />

      {/* Refer Now Button - Perfectly Centered */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          onClick={handleOpenModal}
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #a100ff, #ff0080)",
            px: 6,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1.1rem",
            "&:hover": { background: "linear-gradient(90deg, #8900cc, #cc0066)" },
          }}
        >
          Refer Now
        </Button>
      </Box>

      <ReferralForm open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default ReferralBenefits;
