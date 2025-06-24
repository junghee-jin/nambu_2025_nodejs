const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 정의(생성)
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

(async () => {
  // 콘솔에서 바로 출력하기 위한 즉시 함수
  // 이렇게 하는 이유는  sequelize는 promise를 이용하여 작업하는데
  // asyne/await를 이용해서 프로미스 작업을 하기 위해 즉시실행함수 안에서 코딩
  await sequelize.sync({ force: true });
  const post1 = await Post.create({
    title: "오늘은 비가 온대요",
    content: "퇴근 시간부터 온대요. 저녁에 오길",
    author: "정희진",
  });
  console.log(`post1 created => ${JSON.stringify(post1)}`);
  const post2 = await Post.create({
    title: "평안",
    content: "뜻",
    author: "난이",
  });
  console.log(`post2 created => ${JSON.stringify(post2)}`);

  // select * from posts
  const posts = await Post.findAll();
  console.log(`post findAll => ${JSON.stringify(posts)}`);

  // select * from posts where id = 1
  const post11 = await Post.findByPk(1);
  console.log(`post11 => ${JSON.stringify(post11)}`);

  const post12 = await Post.findOne({
    where: {
      author: "정희진",
    },
  });
  console.log(`post12 => ${JSON.stringify(post12)}`);

  await Post.update(
    {
      title: "이번주는 ORM을 공부하는 주 입니다.",
      content: "이번주는 ORM을 지겹에 공부하는 주 입니다.",
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const post13 = await Post.findByPk(1);
  console.log(`post13 => ${JSON.stringify(post13)}`);

  await Post.destroy({
    where: {
      id: 1,
    },
  });
  const post14 = await Post.findByPk(1);
  console.log(`post14 ==> ${JSON.stringify(post14)}`);
})();
