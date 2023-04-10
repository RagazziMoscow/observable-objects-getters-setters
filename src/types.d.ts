import Observable from "./core"

declare global {
  interface Window {
    App: Observable;
  }
}

export {};
