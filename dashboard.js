// === Tombol Buka Tutup Bilah Samping ===
const sidebar = document.getElementById('sidebar');
const tombolSamping = document.getElementById('tombolSamping');

tombolSamping?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// === Cek Izin Masuk ===
window.addEventListener('load', async () => {
    const kodeIzin = sessionStorage.getItem('kode_izin_tiktok');
    if (!kodeIzin) {
        alert('Silakan hubungkan akun TikTok terlebih dahulu!');
        window.location.href = 'login.html';
        return;
    }

    // Ambil data pengguna nanti disini
    document.getElementById('namaPengguna').textContent = 'Pengguna KelzNex';
});

// === Fungsi Taruh & Pilih Berkas ===
const areaTaruh = document.getElementById('areaTaruh');
const berkasVideo = document.getElementById('berkasVideo');
const kotakProses = document.getElementById('kotakProses');
const isiProses = document.getElementById('isiProses');
const teksProses = document.getElementById('teksProses');
const btnUnggah = document.getElementById('btnUnggah');
let fileTerpilih = null;

areaTaruh?.addEventListener('click', () => berkasVideo.click());

areaTaruh?.addEventListener('dragover', (e) => {
    e.preventDefault();
    areaTaruh.style.opacity = '1';
    areaTaruh.style.background = 'rgba(0,255,242,0.08)';
});

areaTaruh?.addEventListener('dragleave', () => {
    areaTaruh.style.opacity = '0.65';
    areaTaruh.style.background = 'transparent';
});

areaTaruh?.addEventListener('drop', (e) => {
    e.preventDefault();
    areaTaruh.style.opacity = '0.65';
    areaTaruh.style.background = 'transparent';
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
        simpanBerkas(files[0]);
    } else {
        tampilkanPesan('Pilih berkas video saja!', 'error');
    }
});

berkasVideo?.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        simpanBerkas(e.target.files[0]);
    }
});

function simpanBerkas(berkas) {
    fileTerpilih = berkas;
    areaTaruh.innerHTML = `<p>✅ Terpilih: <strong>${berkas.name}</strong> (${(berkas.size / 1024 / 1024).toFixed(1)} MB)</p>`;
}

// === Tombol Unggah ===
btnUnggah?.addEventListener('click', async () => {
    if (!fileTerpilih) return tampilkanPesan('Silakan pilih berkas video terlebih dahulu!', 'error');
    
    kotakProses.classList.remove('hidden');
    btnUnggah.disabled = true;
    btnUnggah.textContent = 'Sedang Mengirim...';

    // Simulasi kemajuan unggah (ganti dengan API asli nanti)
    let proses = 0;
    const jalur = setInterval(() => {
        proses += Math.floor(Math.random() * 7) + 2;
        if (proses >= 100) {
            proses = 100;
            clearInterval(jalur);
            selesaiUnggah();
        }
        isiProses.style.width = `${proses}%`;
        teksProses.textContent = `${proses}%`;
    }, 180);
});

function selesaiUnggah() {
    tampilkanPesan('🎉 Video berhasil dikirim ke TikTok!', 'sukses');
    btnUnggah.disabled = false;
    btnUnggah.textContent = 'Kirim Kualitas Asli';
    
    // Kembalikan tampilan awal
    setTimeout(() => {
        kotakProses.classList.add('hidden');
        isiProses.style.width = '0%';
        teksProses.textContent = '0%';
        areaTaruh.innerHTML = `<p>Tarik berkas atau klik pilih video (MP4/MOV)</p>`;
        fileTerpilih = null;
        berkasVideo.value = '';
    }, 2500);
}

// === Kotak Pesan / Notifikasi ===
function tampilkanPesan(isi, jenis = 'biasa') {
    const kotak = document.getElementById('toast');
    kotak.textContent = isi;
    kotak.className = `toast show ${jenis === 'error' ? 'error' : ''}`;
    
    setTimeout(() => {
        kotak.classList.remove('show');
    }, 3500);
}

// === Tombol Keluar ===
document.getElementById('btnKeluar')?.addEventListener('click', () => {
    sessionStorage.removeItem('kode_izin_tiktok');
    tampilkanPesan('Berhasil keluar!', 'sukses');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 800);
});

// === Grafik Kunjungan ===
const kanvas = document.getElementById('grafikLihat')?.getContext('2d');
if (kanvas) {
    new Chart(kanvas, {
        type: 'line',
        data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [{
                label: 'Kunjungan',
                data: [12, 19, 15, 28, 22, 30, 24],
                borderColor: '#00fff2',
                backgroundColor: 'rgba(0,255,242,0.08)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#c0c0dd' } } },
            scales: {
                x: { ticks: { color: '#888899' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#888899' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}
