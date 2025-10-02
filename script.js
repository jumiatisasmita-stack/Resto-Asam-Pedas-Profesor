document.addEventListener('DOMContentLoaded', function() {
            const pageLinks = document.querySelectorAll('a[data-target], button[data-target]');
            const pages = document.querySelectorAll('.page');
            const navLinks = document.querySelectorAll('.nav-link');
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            function showPage(targetId) {
                // Sembunyikan semua halaman
                pages.forEach(page => {
                    if (!page.classList.contains('hidden')) {
                        page.classList.add('hidden');
                    }
                });

                // Tampilkan halaman yang dituju
                const targetPage = document.getElementById(targetId + '-page');
                if (targetPage) {
                    targetPage.classList.remove('hidden');
                } else {
                    // Jika target tidak ada (misal: link internal artikel), cari target menu
                    const fallbackPage = document.getElementById(targetId + '-page') || document.getElementById('home-page');
                    fallbackPage.classList.remove('hidden');
                }

                // Update link aktif di navigasi
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    // Ganti target artikel (article1, article2) menjadi target menu (blog)
                    let linkTarget = link.getAttribute('data-target');
                    if (targetId.startsWith('article')) {
                        targetId = 'blog';
                    }
                    if (linkTarget === targetId) {
                        link.classList.add('active-link');
                    }
                });
                
                // Sembunyikan menu mobile setelah diklik
                mobileMenu.classList.add('hidden');
                window.scrollTo(0, 0); // Gulir ke atas
            }

            // Tambahkan event listener untuk semua link navigasi dan tombol
            pageLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const targetId = this.getAttribute('data-target');
                    showPage(targetId);
                });
            });

            // Toggle menu mobile
            menuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Tampilkan halaman beranda saat pertama kali dimuat
            showPage('home');
        });
