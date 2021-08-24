export default {
  subscribe: (type, handler, options) => {
    if (typeof window === 'undefined') return;
    window.addEventListener(type, handler, options);

    const unsubscribe = () => {
      window.removeEventListener(type, handler, options);
    };

    return unsubscribe;
  },
  dispatch: (type, detail) => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent(type, { detail }));
  }
};
