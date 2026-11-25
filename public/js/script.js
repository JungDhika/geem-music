document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    // Elemen UI Mini & Main Player
    const miniPlayer = document.getElementById('miniPlayer');
    const openPlayerTrigger = document.getElementById('openPlayerTrigger');
    const miniPlayerInfo = document.getElementById('miniPlayerInfo');
    const mainPlayer = document.getElementById('mainPlayer');
    const closePlayerHandle = document.getElementById('closePlayerHandle');
    const closePlayerBtn = document.getElementById('closePlayerBtn');

    const desktopQuery = window.matchMedia('(min-width: 960px)');

    /* =========================================
       1. TEMA GELAP / TERANG
       ========================================= */
    if (localStorage.getItem('theme') === 'dark') {
        root.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';

        if (isDark) {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* =========================================
       2. BUKA / TUTUP MAIN PLAYER + SWIPE (MOBILE)
       ========================================= */
    function syncViewportState() {
        if (desktopQuery.matches) {
            mainPlayer.style.transform = '';
            mainPlayer.classList.remove('is-open', 'is-dragging');
            mainPlayer.setAttribute('aria-hidden', 'false');
            document.body.classList.remove('player-open');
        } else if (!mainPlayer.classList.contains('is-open')) {
            mainPlayer.setAttribute('aria-hidden', 'true');
        }
    }

    function openMainPlayer() {
        if (desktopQuery.matches) return;
        mainPlayer.style.transform = '';
        mainPlayer.classList.add('is-open');
        mainPlayer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('player-open');
    }

    function closeMainPlayer() {
        if (desktopQuery.matches) return;
        mainPlayer.style.transform = '';
        mainPlayer.classList.remove('is-open');
        mainPlayer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('player-open');
    }

    syncViewportState();
    desktopQuery.addEventListener('change', syncViewportState);

    openPlayerTrigger.addEventListener('click', openMainPlayer);
    miniPlayerInfo.addEventListener('click', openMainPlayer);
    closePlayerHandle.addEventListener('click', closeMainPlayer);
    closePlayerBtn.addEventListener('click', closeMainPlayer);

    document.addEventListener('keydown', (e) => {
        if (!desktopQuery.matches && e.key === 'Escape' && mainPlayer.classList.contains('is-open')) {
            closeMainPlayer();
        }
    });

    // Swipe ke atas pada Mini Player untuk membuka
    let miniStartY = 0;
    miniPlayer.addEventListener('touchstart', (e) => {
        if (desktopQuery.matches) return;
        miniStartY = e.touches[0].clientY;
    }, { passive: true });

    miniPlayer.addEventListener('touchend', (e) => {
        if (desktopQuery.matches) return;
        const deltaY = miniStartY - e.changedTouches[0].clientY;
        if (deltaY > 36) {
            openMainPlayer();
        }
    }, { passive: true });

    // Swipe ke bawah pada Main Player untuk menutup
    let mpStartY = 0;
    let mpDragY = 0;
    let isDraggingSheet = false;

    mainPlayer.addEventListener('touchstart', (e) => {
        if (desktopQuery.matches) return;
        if (e.target.closest('.mp-progress-hit')) return;
        mpStartY = e.touches[0].clientY;
        mpDragY = 0;
        isDraggingSheet = true;
        mainPlayer.classList.add('is-dragging');
    }, { passive: true });

    mainPlayer.addEventListener('touchmove', (e) => {
        if (!isDraggingSheet || desktopQuery.matches) return;
        const deltaY = Math.max(0, e.touches[0].clientY - mpStartY);
        mpDragY = deltaY;
        mainPlayer.style.transform = `translate(-50%, ${deltaY}px)`;
    }, { passive: true });

    mainPlayer.addEventListener('touchend', () => {
        if (!isDraggingSheet) return;
        isDraggingSheet = false;
        mainPlayer.classList.remove('is-dragging');

        if (desktopQuery.matches) {
            mainPlayer.style.transform = '';
            return;
        }

        if (mpDragY > 110) {
            closeMainPlayer();
        } else {
            openMainPlayer();
        }
    });
});