const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // password암호화
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });
  res.status(200).json({ message: "ok", data: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // 이메일로 사용자가 있는 지 확인
  const user = await models.User.findOne({
    where: { email: email },
  });
  // 사용자가 없으면 잘못된 이메일 비밀번호라고 알려줌
  if (!user) {
    return res.status(400).json({ message: "invalid email and password" });
  }
  // 사용자가 있으면 비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // 비밀번호가 일치하지 않으면 사용자에게 노티(알림)
    return res.status(400).json({ message: "Invalid email and password" });
  }
  // 정당한 사용자(메일, 비밀번호 일치)하면 임시허가증 발급: 분실불가. 항상 어딘가에 저장 필요
  const accessToken = generateAccessToken(user);
  res.json({ message: "ok", accessToken: accessToken });
};

module.exports = {
  register,
  login,
};
