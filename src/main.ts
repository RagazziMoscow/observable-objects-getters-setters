import Observable from "./core";

const App = new Observable({
  title: 'Game of Thrones',
  firstName: 'Jon',
  lastName: 'Snow',
  age: 25
});

function onInputChange(property: string, event: InputEvent): void {
  App.data[property] = (event.target as HTMLInputElement).value;
}

window.App = App;
window.onInputChange = onInputChange;
