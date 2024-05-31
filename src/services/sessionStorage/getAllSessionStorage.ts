export const getAllSessionStorage = (): { [key: string]: string } => {
  const storage: { [key: string]: string } = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      const value = sessionStorage.getItem(key);
      if (value !== null) storage[key] = value;
    }
  }
  return storage;
};
