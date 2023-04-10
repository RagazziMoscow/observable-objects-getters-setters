import Observable from "./core";

const App = new Observable({
  title: 'Game of Thrones',
  firstName: 'Jon',
  lastName: 'Snow',
  age: 25
});

window.App = App;
