export const getPools = async () => {
  const pools = await fetch("https://newapi.pearl.exchange/api/v2/pools").then(
    (r) => r.json()
  );

  const v2 = [];
  const v3 = [];

  for (const pool of pools.data) {
    if (pool.protocol === 0) {
      v2.push(pool);
    } else {
      v3.push(pool);
    }
  }
  return { v2, v3 };
};
