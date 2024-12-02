document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.btn');
    const resultDisplay = document.getElementById('result');
    let currentInput = ''; // Menyimpan input saat ini
    const historyList = document.getElementById('history-list');

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.innerText;

            if (value === "=") {
                try {
                    const result = eval(currentInput); // Hitung hasil
                    resultDisplay.innerText = result; // Menampilkan hasil pada layar kalkulator
                    
                    // Ambil operator dan angka pertama
                    const match = currentInput.match(/(\d+)([\+\-\*\/])(\d+)/);
                    const num1 = match ? match[1] : currentInput; // Angka pertama
                    const operation = match ? match[2] : ""; // Operator

                    // Kirim data ke server menggunakan fetch
                    fetch("save_history.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: `num1=${num1}&operation=${operation}&result=${result}`,
                    })
                    .then((response) => response.text())
                    .then((data) => {
                        console.log(data); // Debugging, lihat status di console
                        loadHistory(); // Setelah data disimpan, load history terbaru
                    });

                    currentInput = result.toString(); // Simpan hasil untuk input selanjutnya
                } catch {
                    resultDisplay.innerText = "Error";
                    currentInput = "";
                }
            } else if (value === "C") {
                currentInput = ""; // Reset input ketika tombol C ditekan
                resultDisplay.innerText = "0"; // Reset tampilan hasil
            } else {
                currentInput += value; // Tambahkan angka atau operator ke input
                resultDisplay.innerText = currentInput; // Update tampilan input
            }
        });
    });

    // Fungsi untuk memuat riwayat dari server
    function loadHistory() {
        fetch('fetch_history.php')
            .then((response) => response.json())
            .then((data) => {
                historyList.innerHTML = ''; // Kosongkan riwayat lama
                data.forEach((entry) => {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item');
                    li.textContent = `${entry.num1} ${entry.operation} = ${entry.result}`;
                    historyList.appendChild(li);
                });
            });
    }

    // Panggil fungsi loadHistory saat halaman dimuat
    loadHistory();
});
