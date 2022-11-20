/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const date_of_today = new Date();
    const seconds_in_day = 86400000;
    [
      {
        title: "todo task-1",
        completed: false,
        dueDate: new Date(
          date_of_today.getTime() - seconds_in_day).toLocaleDateString("en-CA"),
      },
      {
        title: "todo task-2",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "todo task-3",
        completed: false,
        dueDate: new Date(
          date_of_today.getTime() + seconds_in_day
        ).toLocaleDateString("en-CA"),
      },
    ].forEach(add);
  });
  test("A new todo creation", () => {
    expect(all.length).toEqual(3);
    add({
      title: "todo task-4",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(4);
  });

  test("checking a todo is marked as completed or not", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("checks if overdue items are retrieved or not", () => {
    expect(overdue().length).toEqual(1);
  });

  test("checks if due today items are retrieved or not", () => {
    expect(dueToday().length).toEqual(2);
  });

  test("checks if due later items are retrieved or not", () => {
    expect(dueLater().length).toEqual(1);
  });
});
