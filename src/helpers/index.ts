const getUnicID = (prefix: string): string => {
  return (
    prefix +
    ((Math.random().toFixed(4) as unknown as number) * 10000).toString()
  );
};

export { getUnicID };
