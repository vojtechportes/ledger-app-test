/**
 * This file contains all function helper we provide to simplify the exercice.
 * Please fully study what the functions are doing and feel free to modify it in your own projects.
 * Feel free to add more feature if needed.
 */

export const isValidEthereum = address => address.match(/^0x[0-9a-fA-F]{40}$/);

/**
 * fetchTxs allows to retrieve all transactions of an Ethereum address with Ledger's API
 * It takes an ethereum address and returns a Promise of an array of transactions (from the blockchain).
 *
 * Feel free to play with it beforehand and look at the returned value objects.
 */
export const fetchTxs = async address => {
  const fetchTxsPage = (address, block) => {
    const url = `http://eth-mainnet.explorers.prod.aws.ledger.fr/blockchain/v3/addresses/${address}/transactions?batch_size=2000&no_token=true${
      block ? "&block_hash=" + block : ""
    }`;
    console.log("GET", url);
    return fetch(url).then(async r => {
      if (!r.ok) {
        const res = await r.text();
        throw res;
      }
      return r.json();
    });
  };

  console.log(`fetching txs for ${address}`);
  let { txs } = await fetchTxsPage(address);
  while (true) {
    const last = txs[txs.length - 1];
    if (!last) break;
    const { block } = last;
    if (!block) break;
    const next = await fetchTxsPage(address, block.hash);
    const nextTxs = next.txs.filter(tx => !txs.some(t => t.hash === tx.hash));
    if (nextTxs.length === 0) break;
    txs = txs.concat(nextTxs);
  }
  txs.reverse();
  console.log(`finished fetching ${txs.length} txs for ${address}`);
  return txs;
};

/**
 * txsToOperations takes the retrieved array of transactions
 * and transform it to an array of operations.
 *
 * NB: a blockchain transaction can produce multiple operations.
 * Not only a "SELF" transaction produces 2 moves but also, with ERC20,
 * we in fact can have many token operations in one transaction.
 *
 * Please study the function below and test it with different transactions.
 */
export const txsToOperations = (txs, address) => {
  const ops = [];
  console.log(txs.length);
  console.log(JSON.stringify(txs[0]));

  try {
    for (let i = 0; i < txs.length; i++) {
      const tx = txs[i];
      const fee = tx.gas_price * tx.gas_used;
      const sending = address.toLowerCase() === tx.from.trim().toLowerCase();
      const receiving = address.toLowerCase() === tx.to.trim().toLowerCase();
      const value = tx.value;
      if (i > 1000 && i < 1010) {
        console.log(address, tx.to);
      }
      if (sending) {
        ops.push({
          symbol: "ETH",
          magnitude: 18,
          id: `${tx.hash}-OUT`,
          hash: tx.hash,
          type: "OUT",
          value: value + fee,
          address: tx.to,
          date: new Date(tx.received_at)
        });
      }
      if (receiving) {
        ops.push({
          symbol: "ETH",
          magnitude: 18,
          id: `${tx.hash}-IN`,
          hash: tx.hash,
          type: "IN",
          value,
          address: tx.from,
          date: new Date(tx.received_at)
        });
      }
      const transfers = tx.transfer_events.list;
      for (let j = 0; j < transfers.length; j++) {
        const event = transfers[j];
        if (event.symbol) {
          const symbol = event.symbol.match(/([^ ]+)/g)[0];
          const sending = address.toLowerCase() === event.from.trim().toLowerCase();
          const receiving = address.toLowerCase() === event.to.trim().toLowerCase();
          const value = event.count;
          if (sending) {
            ops.push({
              symbol,
              magnitude: event.decimal,
              id: `${tx.hash}-${j}-OUT`,
              hash: tx.hash,
              type: "OUT",
              value,
              address: event.to,
              date: new Date(tx.received_at)
            });
          }
          if (receiving) {
            ops.push({
              symbol,
              magnitude: event.decimal,
              id: `${tx.hash}-${j}-IN`,
              hash: tx.hash,
              type: "IN",
              value,
              address: event.from,
              date: new Date(tx.received_at)
            });
          }
        }
        if (i === 500) {
          console.log(500);
        }
        if (i === 1500) {
          console.log(1500);
        }
        if (i === 2500) {
          console.log(1500);
        }
        if (i === 4500) {
          console.log(4500);
        }
      }
      if (i < 2) {
        console.log(ops);
      }
    }
  } catch (err) {
    throw err;
  }
  return ops;
};

/**
 * This is an example to calculate the balance.
 * You might want to diverge from it to add more feature!
 *
 * It takes an array of operations and calculates balances of ETH and ERC20
 * as well as other information.
 *
 * Feel free to play with it.
 */
export const getTokensSummary = operations => {
  const tokens = {};

  operations.forEach(op => {
    if (typeof tokens[op.symbol] === "undefined") {
      tokens[op.symbol] = {};
    }

    if (typeof tokens[op.symbol].symbol === "undefined") {
      tokens[op.symbol].symbol = op.symbol;
    }

    if (typeof tokens[op.symbol].magnitude === "undefined") {
      tokens[op.symbol].magnitude = op.magnitude;
    }

    tokens[op.symbol].value =
      (tokens[op.symbol].value || 0) +
      (op.type === "OUT" ? -op.value : op.value);
  });

  return tokens;
};

/**
 * formatValue will returns a string that is human readable for a cryptocurrency amount.
 * Example: formatValue(100000, 8) is 0.001 (because 100000 satoshis is 0.001 btc)
 *
 * - value is an amount in cryptocurrencies smallest unit (e.g. the satoshi / the wei)
 * - magnitude is the number of digits that the coin supports
 */
export const formatValue = (value, magnitude) =>
  (value / Math.pow(10, magnitude)).toLocaleString();

/** fetch asset rate to usdt */
export const getUSDTRate = async asset => {
  const url =
    "https://min-api.cryptocompare.com/data/price?fsym=" + asset + "&tsyms=USD";
  return await fetch(url).then(async r => {
    const data = await r.json();

    if (data.response === "Error") {
      return data.error;
    }

    return data.USD;
  });
};
