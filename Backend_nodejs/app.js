const express = require("express");
const app = express();

app.use(express.json());


const cors = require("cors");
const { sequelize } = require("./models");
const discussionRoutes = require("./routes/discussionRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());


// Routes
app.use("/discussions", discussionRoutes);

app.use("/comments", commentRoutes);
app.use('/api', userRoutes);

// Sync database
sequelize
  .sync({ alter: true }) // Alter ensures the schema is updated
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





