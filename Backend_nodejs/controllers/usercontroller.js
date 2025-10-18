
const { User } = require("../models");
 const createUser = async (req, res) => {
  try {
    const { username, email, password ,address} = req.body;
    const user = await User.create({ username, email, password,address });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
};

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch users', details: err.message });
//   }
// };


const getAllUsers = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from the request body

    // Check if the user exists with the provided email and password
    const user = await User.findOne({
      where: {
        email: email,
        password: password, // In a real application, you should hash the password
      },
    });

    // If user is not found, return an error response
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If user is found, return success response with user details (excluding sensitive data if needed)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        address: user.address,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login', details: err.message });
  }
};


module.exports={
  createUser,
  getAllUsers
}