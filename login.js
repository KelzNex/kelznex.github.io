// Data resmi aplikasi
const CLIENT_KEY = 'sbawrcr8glbyfki5hi';
const REDIRECT_URI = encodeURIComponent('https://kelznex.github.io/dashboard.html');
const SCOPE = 'user.info.basic,video.create,video.manage';

// Alamat halaman izin TikTok
const ALAMAT_MASUK = `https://www.tiktok.com/auth/authorize/?client_key=${CLIENT_KEY}&scope=${SCOPE}&response_type=code&redirect_uri=${REDIRECT_URI}&state=kelznex_${Date.now()}`;

// Aksi tombol masuk
document.getElementById('btnMasuk').addEventListener('click', () => {
    window.location.href = ALAMAT_MASUK;
});

// Tangani kembali dari TikTok
window.addEventListener('load', () => {
    const param = new URLSearchParams(window.location.search);
    const kodeIzin = param.get('code');
    const pesanSalah = param.get('error');

    if (pesanSalah) {
        alert('Gagal: ' + (param.get('error_description') || 'Anda membatalkan izin'));
        return;
    }

    if (kodeIzin) {
        sessionStorage.setItem('kode_izin_tiktok', kodeIzin);
        window.location.href = 'dashboard.html';
    }
});
