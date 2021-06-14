import jsCookie from 'js-cookie';

const cookies = {
  get(name: string): string | undefined {
    const value = jsCookie.get(name);
    return value;
  },

  remove(name: string): void {
    jsCookie.remove(name);
  },

  set(name: string, value: string): void {
    jsCookie.set(name, value);
  }
};

export default cookies;
