const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Faculty extends Model {}
class Pulpit extends Model {}
class Teacher extends Model {}
class Subject extends Model {}
class Auditorium_type extends Model {}
class Auditorium extends Model {}

function internalORM(sequelize) {
  Faculty.init(
    {
      Faculty: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
      faculty_name: { type: Sequelize.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Faculty",
      tableName: "Faculty",
      timestamps: false,
    }
  );

  Pulpit.init(
    {
      Pulpit: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
      pulpit_name: { type: Sequelize.STRING, allowNull: false },
      faculty: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: Faculty, key: "faculty" },
      },
    },
    { sequelize, modelName: "Pulpit", tableName: "Pulpit", timestamps: false }
  );

  Teacher.init(
    {
      Teacher: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
      teacher_name: { type: Sequelize.STRING, allowNull: false },
      pulpit: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: Pulpit, key: "pulpit" },
      },
    },
    { sequelize, modelName: "Teacher", tableName: "Teacher", timestamps: false }
  );

  Subject.init(
    {
      Subject: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
      subject_name: { type: Sequelize.STRING, allowNull: false },
      pulpit: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: Pulpit, key: "pulpit" },
      },
    },
    { sequelize, modelName: "Subject", tableName: "Subject", timestamps: false }
  );
  Auditorium_type.init(
    {
      Auditorium_type: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      auditorium_typename: { type: Sequelize.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Auditorium_type",
      tableName: "Auditorium_type",
      timestamps: false,
    }
  );
  Auditorium.init(
    {
      Auditorium: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      auditorium_name: { type: Sequelize.STRING, allowNull: false },
      auditorium_capacity: { type: Sequelize.INTEGER, allowNull: false },
      auditorium_type: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: Auditorium, key: "auditorium" },
      },
    },
    {
      sequelize,
      modelName: "Auditorium",
      tableName: "Auditorium",
      timestamps: false,
    }
  );
}

exports.ORM = (s) => {
  internalORM(s);
  return { Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium };
};
