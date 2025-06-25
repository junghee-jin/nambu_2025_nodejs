// 문제 todos
// 할일: task, 할일설명: description, 완료여부: completed createdAt, priority

const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "todo.db",
});

// todo 모델, todos 생성
const Todo = sequelize.define("Todo", {
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

(async () => {
  await sequelize.sync({ force: false });
  // todo 데이터 2개 입력
  const todo1 = await Todo.create({
    task: "할일1",
    description: "여름휴가준비물",
    completed: false,
    priority: 1,
  });
  console.log(`todo1 create => ${JSON.stringify(todo1)}`);
  const todo2 = await Todo.create({
    task: "할일2",
    description: "정신차려준비물",
    completed: false,
    priority: 1,
  });
  console.log(`todo1 create => ${JSON.stringify(todo2)}`);
  // todo 데이터 전체 조회
  const todos = await Todo.findAll();
  console.log(`todo findAll => ${JSON.stringify(todos)}`);
  // todo 아이디 2번인 항목 조회
  const todo11 = await Todo.findByPk(2);
  console.log(`todo11 => ${JSON.stringify(todo11)}`);
  // todo 아이디 2번 completed완료로 바꿈
  await Todo.update(
    {
      completed: true,
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const todo22 = await Todo.findByPk(2);
  console.log(`todo22 => ${JSON.stringify(todo22)}`);
  // todo 아이디 2인 항목 삭제

  await Todo.destroy({
    where: {
      id: 1,
    },
  });
  const todo33 = await Todo.findByPk(3);
  console.log(`todo33 => ${JSON.stringify(todo33)}`);
})();
