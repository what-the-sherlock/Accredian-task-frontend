import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box
} from "@mui/material";

const ReferralForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: "",
    refereePhone: "",
  });

  const [showReferralCode, setShowReferralCode] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateReferralCode = () => {
    return "REF" + Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit referral code
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/submit-referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setReferralCode(data.referralCode);
        setShowReferralCode(true);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting referral:", error);
      alert("Failed to submit referral");
    }
  };
  

  const handleClose = () => {
    setShowReferralCode(false);
    setReferralCode("");
    setFormData({
      referrerName: "",
      referrerEmail: "",
      refereeName: "",
      refereeEmail: "",
      refereePhone: "",
    });
    onClose(); // Close modal
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": { 
          backgroundColor: "#1e1e1e", 
          color: "#fff", 
          borderRadius: "12px",
          boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.5)" 
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          textAlign: "center", 
          fontWeight: "bold", 
          color: "#00e5ff",
          fontSize: "1.5rem" 
        }}
      >
        ✨ Refer & Earn Rewards!
      </DialogTitle>

      <DialogContent>
        {!showReferralCode ? (
          <form onSubmit={handleSubmit}>
            {["referrerName", "referrerEmail", "refereeName", "refereeEmail", "refereePhone"].map((field, index) => (
              <TextField
                key={index}
                name={field}
                label={
                  field === "referrerName" ? "Your Name" :
                  field === "referrerEmail" ? "Your Email" :
                  field === "refereeName" ? "Friend's Name" :
                  field === "refereeEmail" ? "Friend's Email" : "Friend's Phone"
                }
                type={field.includes("Email") ? "email" : field.includes("Phone") ? "tel" : "text"}
                fullWidth
                margin="dense"
                required
                value={formData[field]}
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiInputLabel-root": { color: "#bbb" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#00e5ff" },
                    "&:hover fieldset": { borderColor: "#00ffff" },
                    "&.Mui-focused fieldset": { borderColor: "#00e5ff" }
                  },
                  input: { backgroundColor: "#333", borderRadius: "5px", padding: "10px" }
                }}
              />
            ))}
            <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
              <Button onClick={handleClose} color="secondary" variant="outlined" sx={{ color: "#00e5ff", borderColor: "#00e5ff" }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: "#00e5ff", "&:hover": { backgroundColor: "#00b3cc" } }}>
                Submit
              </Button>
            </DialogActions>
          </form>
        ) : (
          <Box textAlign="center" py={3}>
            <Typography variant="h6" sx={{ color: "#00e5ff" }}>✅ Referral Submitted Successfully!</Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mt: 1, 
                fontWeight: "bold", 
                color: "#fff", 
                backgroundColor: "#222", 
                padding: "10px", 
                borderRadius: "8px", 
                display: "inline-block",
                boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.7)"
              }}
            >
              Your Referral Code: <span style={{ fontSize: "20px", color: "#00e5ff" }}>{referralCode}</span>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#bbb" }}>
              Share this code with your friend to avail the course discount!
            </Typography>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: "#00e5ff", "&:hover": { backgroundColor: "#00b3cc" } }}>
                Close
              </Button>
            </DialogActions>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReferralForm;

