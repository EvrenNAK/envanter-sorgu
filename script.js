let data = [];

fetch("data.json")
  .then(res => res.json())
  .then(json => data = json);

function search() {
  const value = document.getElementById("searchInput").value.trim();
  const table = document.getElementById("resultTable");
  table.innerHTML = "";

  const results = data.filter(item =>
    item.stok_kodu === value || item.barkod === value
  );

  results.forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r.stok_kodu}</td>
        <td>${r.urun}</td>
        <td>${r.barkod}</td>
        <td>${r.lokasyon}</td>
        <td>${r.adet}</td>
      </tr>
    `;
  });
}
