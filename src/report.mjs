export function report(rows) {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Expected at least one sample record');
  rows=rows.map(row=>({...row}));
  for (const row of rows) {
    if (["id","product","stock"].some(k=>row[k]==null)) throw new Error('Missing required field');
    if (typeof row.stock==='string' && row.stock.trim()) row.stock=Number(row.stock);
    if (!Number.isFinite(row.stock)) throw new Error('Expected a numeric metric');
  }
  return {reorder: rows.filter(r=>r.stock<5).map(r=>({product:r.product,stock:r.stock,orderUnits:10-r.stock}))};
}
