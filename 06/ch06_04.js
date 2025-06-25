const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "posts.db",
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

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

const Comment = sequelize.define(
  "comment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "comments" }
);

User.hasMany(Post, {
  foreignKey: "authorId", // 동일한 FK 컬럼명 지정
}); // 1(User): N(Post) 관계 // 하나의 유저는 여러개의 블로그를 받는다
Post.belongsTo(User, {
  foreignKey: "authorId",
}); // N(post): 1(User) // 여러개의 블로그는 하나의 유저에 속한다
// post 테이블에 forgein key로 user를 잡힌다

// User <-> Comment
User.hasMany(Comment, { foreignKey: "userId" }); // 동일한 컬럼명 지정
Comment.belongsTo(User, { foreignKey: "userId" }); // 여기서 FK컬럼명 지정 userId
// Comment <-> Post
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

(async () => {
  await sequelize.sync({ force: true });

  const user1 = await User.create({
    username: "홍길동",
    email: "hong1@naver.com",
    password: "012345",
    age: 40,
  });
  const user2 = await User.create({
    username: "장길산",
    email: "jang1@naver.com",
    password: "543210",
    age: 60,
  });

  const post1 = await Post.create({
    title: "이란은 언제 공격을 중단할까요?",
    content: "중단",
    authorId: user2.id,
  });
  const post2 = await Post.create({
    title: "닭도리탕",
    content: "맛있나",
    authorId: user2.id,
  });

  const comment1 = await Comment.create({
    content: "저도 먹고 싶어요",
    userId: user1.id,
    postId: post2.id,
  });
  const comment2 = await Comment.create({
    content: "레시피를 공개해 주세요.",
    userId: user1.id,
    postId: post2.id,
  });
  const comment3 = await Comment.create({
    content: "시판양념 + 감자 + 닭다리10개 + 양파 입니다.",
    userId: user1.id,
    postId: post2.id,
  });

  const posts = await Post.findAll({
    include: [
      {
        model: Comment,
        include: [User],
      },
      {
        model: User,
      },
    ],
  });
  console.log(`posts => ${JSON.stringify(posts)}`);

  const users = await User.findByPk(2, {
    include: {
      model: Post,
    },
  });
  console.log(`users => ${JSON.stringify(users)}`);
})();
