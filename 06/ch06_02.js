const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "user.db",
});

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "users" }
);

(async () => {
  // 모델로 테이블을 생성하는 코드 넣기
  await sequelize.sync({ force: false });

  // 사용자 2명 생성 각각 출력
  const user1 = await User.create({
    username: "jamppo",
    password: "12345",
    email: "jamppohj@kakao.com",
    birthDate: "1988-12-23",
  });
  console.log(`user1 create => ${JSON.stringify(user1)}`);

  const user2 = await User.create({
    username: "jajam",
    password: "54321",
    email: "jamppohj@kakao.com",
    birthDate: "1988-12-23",
  });
  console.log(`user2 create => ${JSON.stringify(user2)}`);
  // 사용자 전체를 검색
  const users = await User.findAll();
  console.log(`user findAll => ${JSON.stringify(users)}`);
  // 사용자 아이디가 2번인 사용자만 출력
  const user11 = await User.findByPk(2);
  console.log(`user2 => ${JSON.stringify(user11)}`);
  // 사용자 아이디가 2번인 사람의 email을 jihooni@kakao.com으로 바꾸고 출력
  await User.update(
    {
      email: "jihooni@kakao.com",
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const user22 = await User.findByPk(2);
  console.log(`user22 => ${JSON.stringify(user22)}`);

  // 사용자 아이디가 2번인 사람을 삭제 후 2번인 사람을 출력: 결과는 null
  await User.destroy({
    where: {
      id: 2,
    },
  });
  const user33 = await User.findByPk(2);
  console.log(`user33 => ${JSON.stringify(user33)}`);
})();
