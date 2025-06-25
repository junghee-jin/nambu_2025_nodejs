const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "users.db",
});

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5], // 사용자 이름이 2자리부터 5자리까지만 허용
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // 이메일 유효성 검사: 이메일 형식이어야 값이 들어올 수 있음
      },
    },
    password: {
      // 단방향 암호화
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 150,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  { tableName: "users" }
);

(async () => {
  await sequelize.sync({ force: false });

  const user1 = await User.create({
    username: "홍길동",
    email: "a@example.com",
    password: "123456",
    age: 20,
  });
  const user2 = await User.create({
    username: "김길동",
    email: "b@example.com",
    password: "456123",
    age: 20,
  });
  const user3 = await User.create({
    username: "박길동",
    email: "c@example.com",
    password: "132556",
    age: 20,
  });
  const user4 = await User.create({
    username: "이길동",
    email: "d@example.com",
    password: "127856",
    age: 20,
  });
  const user5 = await User.create({
    username: "정길동",
    email: "e@example.com",
    password: "129876",
    age: 20,
  });

  const users1 = await User.findAll({
    where: {
      email: {
        [Op.like]: "a%",
      },
    },
  });
  console.log(
    users1.map((u) => {
      return {
        email: u.email,
        name: u.username,
      };
    })
  );

  const user6 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 20,
      },
    },
  });
})();
