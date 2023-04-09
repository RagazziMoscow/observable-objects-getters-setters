import Observable from "./core"

declare global {
  interface Window {
    App: Observable;
    onInputChange: (property: string, event: Event) => void;
  }
}

export {};
