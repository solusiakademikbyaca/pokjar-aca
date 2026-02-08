document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("cekBtn");

  btn.addEventListener("click", () => {
    const nimInput = document.getElementById("nimInput").value.trim();

    if (!nimInput) {
      alert("NIM belum diisi");
      return;
    }

    const SPREADSHEET_ID = "1SvU-xNrzFI9_VeOyjbpEx4oO5g9G45aR";
    const SHEET_NAME = "Database Mahasiswa";

    const query = `
      select A, B, C, I, J, K, L
      where A contains '${nimInput}'
    `;

    const url =
      "https://docs.google.com/spreadsheets/d/" +
      SPREADSHEET_ID +
      "/gviz/tq?sheet=" +
      encodeURIComponent(SHEET_NAME) +
      "&tq=" +
      encodeURIComponent(query);

    fetch(url)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(
          text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
        );

        if (!json.table.rows.length) {
          alert("NIM tidak ditemukan di database");
          return;
        }

        const data = json.table.rows[0].c;

        const mahasiswaData = {
          nim: data[0].v,
          nama: data[1].v,
          jurusan: data[2].v,
          ipk: data[3].v,
          ips: data[4].v,
          sksTotal: data[5].v,
          sksLulus: data[6].v
        };

        sessionStorage.setItem(
          "pokjarMahasiswa",
          JSON.stringify(mahasiswaData)
        );

        window.location.href = "hasil.html";
      })
      .catch(err => {
        console.error(err);
        alert("Gagal membaca database");
      });
  });
});
