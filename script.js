let data = [];

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    console.log("Yüklenen kayıt sayısı:", data.length);
  });

function search() {
  const value = document.getElementById("searchInput").value.trim();
  const table = document.getElementById("resultTable");
  table.innerHTML = "";

  const results = data.filter(item => {
    const stok = String(item["Stok Kodu"] ?? "").trim();
    const barkod = String(item["Barkod"] ?? "").trim();
    return stok.includes(value) || barkod.includes(value);
  });

  if (results.length === 0) {
    table.innerHTML = `<tr><td colspan="5">Sonuç yok</td></tr>`;
    return;
  }

  results.forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r["Stok Kodu"]}</td>
        <td>${r["Stok Tanımı"]}</td>
        <td>${r["Barkod"]}</td>
        <td>${r["Lokasyon"]}</td>
        <td>${r["Say.Adet"]}</td>
      </tr>
    `;
  });
}
