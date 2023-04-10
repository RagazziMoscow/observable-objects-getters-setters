import Observable from "./core";

const App = new Observable({
  title: 'Game of Thrones',
  firstName: 'Jon',
  lastName: 'Snow',
  age: 25
});

window.App = App;

/**
 * Idea:
 * https://www.monterail.com/blog/2016/how-to-build-a-reactive-engine-in-javascript-part-1-observable-objects
 */