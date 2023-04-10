export default class Observable {
  private signals: Record<string, (() => void)[]> = {};
  public data: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.makeObjectReactive(data);
    this.data = data;
  }

  private makeObjectReactive(obj: Record<string, any>): void {
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        this.makePropertyReactive(obj, property)
      }
    }

    this.parseDOM(obj);
  }

  private makePropertyReactive(obj: Record<string, any>, property: string) : void {
    const self = this;
    let value = obj[property];

    Object.defineProperty(obj, property, {
      get() {
        return value;
      },
      set(newValue: any) {
        value = newValue;
        self.notify(property);
      }
    });
  }

  private notify(signal: string): void {
    if (!this.signals[signal] || this.signals[signal].length < 1) {
      return;
    }

    this.signals[signal].forEach(signalCallback => signalCallback());
  }

  private observe(property: string, callback: () => void): void {
    if (!this.signals[property]) {
      this.signals[property] = [];
    }

    this.signals[property].push(callback);
  }

  private parseDOM(observable: Record<string, any>): void {
    const nodes = Array.from(document.querySelectorAll('[v-text]'));
    const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('[v-model]'));
    const elements = [...nodes, ...inputs];

    for (const element of elements) {
      this.syncElement(element, observable);
    }
  }

  private syncElement(element: Element | HTMLInputElement, observable: Record<string, any>): void {
    const directive = element instanceof HTMLInputElement ? "v-model" : "v-text";
    const property = element.attributes.getNamedItem(directive).value;

    this.updateElement(element, observable[property]);
    this.observe(property, () => this.updateElement(element, observable[property]));
    element.addEventListener("input", (event: Event) => {
      observable[property] = (event.target as HTMLInputElement).value;
    });
  }

  private updateElement(element: Element | HTMLInputElement, value: string): void {
    const isInput = element instanceof HTMLInputElement;

    if (isInput) {
      (element as HTMLInputElement).value = value;
    } else {
      element.textContent = value;
    }
  }
}
