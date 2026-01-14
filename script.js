let data = [];
let keys = {};

fetch("envanter.xlsx")
  .then(res => res.arrayBuffer())
  .then(buffer => {
    const wb = XLSX.read(buffer, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(sheet);

    const cols = Object.keys(data[0]);

    keys.stok = cols.find(c => c.toLowerCase().includes("stok") || c.includes("500"));
    keys.urun = cols.find(c => c.toLowerCase().includes("tanım") || c.toLowerCase().includes("urun"));
    keys.barkod = cols.find(c => c.toLowerCase().includes("barkod"));
    keys.lokasyon = cols.find(c => c.toLowerCase().includes("lokasyon"));
    keys.adet = cols.find(c => c.toLowerCase().includes("adet"));

    console.log("Kolonlar:", keys);
  });

function search() {
  const val = document.getElementById("searchInput").value.trim();
  const table = document.getElementById("resultTable");
  table.innerHTML = "";

  if (!val) return;

  const results = data.filter(r => {
    const stok = String(r[keys.stok] ?? "");
    const barkod = String(r[keys.barkod] ?? "");
    return stok.includes(val) || barkod.includes(val);
  });

  if (results.length === 0) {
    table.innerHTML = `<tr><td colspan="5">Sonuç yok</td></tr>`;
    return;
  }

  results.forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r[keys.stok] ?? ""}</td>
        <td>${r[keys.urun] ?? ""}</td>
        <td>${r[keys.barkod] ?? ""}</td>
        <td>${r[keys.lokasyon] ?? ""}</td>
        <td>${r[keys.adet] ?? ""}</td>
      </tr>
    `;
  });
}
