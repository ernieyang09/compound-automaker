import { solidityPacked } from "ethers";

export const pack = (routes, reverse = false) => {
  const [types, values] = routes.reduce(
    (acc, cur, idx) => {
      const last = idx === routes.length - 1;
      const [types, values] = acc;

      types.push("address");
      values.push(cur.from);

      types.push("uint24");
      values.push(cur.fee.toString());

      if (last) {
        types.push("address");
        values.push(cur.to);
      }

      return [types, values];
    },
    [[], []]
  );

  return solidityPacked(types, reverse ? values.reverse() : values);
};
