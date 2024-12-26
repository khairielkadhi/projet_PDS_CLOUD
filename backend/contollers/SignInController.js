const jwt = require("jsonwebtoken"); 
const UserModel = require("../models/SingUpModel");

// Define a secret key for JWT
const JWT_SECRET = "your-secret-key"; // Replace with your actual secret key

module.exports.getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    if (user.password === password) {
      // Generate and return a token for successful login
      const token = generateToken(user); // Use the function to generate token
      return res.json({ token });
    } else {
      return res.status(401).send("Mot de passe incorrect");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).send("Erreur de serveur");
  }
};

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
}



module.exports.getUserByID= async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    // Retournez les informations de l'utilisateur (à adapter en fonction de votre modèle de données)
    return res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
    res.status(500).send("Erreur de serveur");
  }
};

