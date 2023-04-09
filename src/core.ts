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

    this.parseDOM(document.body, obj);
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

  private parseDOM(node: Node, observable: Record<string, any>): void {
    const nodes = Array.from(document.querySelectorAll('[v-text]'));
  
    for (const node of nodes) {
      const property = node.attributes.getNamedItem("v-text").value;  
      node.textContent = observable[property];

      this.observe(property, () => node.textContent = observable[property]);
    }
  }
}
