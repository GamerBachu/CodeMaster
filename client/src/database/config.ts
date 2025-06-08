const dbTable = {
  USER: "USER",
  CART: "CART",
} as const;

type TableName = keyof typeof dbTable;

const loadData = async <T = unknown>(table: TableName): Promise<T | null> => {
  const data = localStorage.getItem(dbTable[table]);
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
};

const saveData = async <T>(table: TableName, data: T): Promise<void> => {
  localStorage.setItem(dbTable[table], JSON.stringify(data));
};

const config = {
  dbTable,
  loadData,
  saveData,
};

export default config;
