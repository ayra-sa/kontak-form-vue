// import dotenv from "dotenv";

// dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)

  try {
    if (username === "admin" && password === "admin") {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
      return res.json({ token });
    }

    res.status(401).json({ message: "Username or password is incorrect" });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }

  // try {
  //   const admin = await Admin.findOne({ where: { username } });
  //   if (!admin)
  //     return res
  //       .status(401)
  //       .json({ message: "Username or password is incorrect" });

  //   const isMatch = await bcrypt.compare(password, admin.password);
  //   if (!isMatch)
  //     return res
  //       .status(401)
  //       .json({ message: "Username or password is incorrect" });

  //   const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "1h" });
  //   res.json({ token });
  // } catch (error) {
  //   res.status(500).json({ message: "Login failed" });
  // }
};

export const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(400).json({ msg: "Can't logout" });
    res.status(200).json({ msg: "Logout successfully" });
  });
};
