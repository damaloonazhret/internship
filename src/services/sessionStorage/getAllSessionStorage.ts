export const getAllSessionStorage = (): { [key: string]: string | null } => {
  const storage: { [key: string]: string | null } = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      const value = sessionStorage.getItem(key);
      storage[key] = value;
    }
  }
  return storage;
};
