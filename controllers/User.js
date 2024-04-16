const { Users, sequelize } = require("../models");
const bcrypt = require("bcryptjs");
const { createTokens } = require("../middleware/token");
exports.createUser = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { name, email, password, phoneNumber } = req.body;
    const existingUser = await Users.findOne({
      where: { email: email },
      transaction,
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create(
      {
        name: name,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const { email, password} = req.body;
        const user = await Users.findOne({where: {email: email}, transaction});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid password"});
        }
        const accessToken = createTokens(user);
        await transaction.commit();
        return res.status(200).json({message: "Login successful", accessToken: accessToken});
    }catch(error){
        if(transaction) await transaction.rollback();
        return res.status(500).json({message: error.message});
    }
}