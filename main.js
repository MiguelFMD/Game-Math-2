// =========================================================
// GENERADOR DEL MENÚ LATERAL DINÁMICO + BOTÓN DARK MODE
// =========================================================
function cargarMenu(rutaBase) {
    const aside = document.querySelector('aside');
    if (!aside) return;

    aside.innerHTML = `
        <div class="sidebar-header">
            <h2>Matemáticas para videojuegos II</h2>
            <button id="theme-toggle" class="theme-toggle-btn" aria-label="Cambiar tema" title="Alternar Modo Claro / Oscuro">
                <i class="fa-solid fa-moon" id="theme-icon"></i>
            </button>
        </div>
        <h2>Contenidos</h2>
        <nav>
            <ul>
                <li><a href="${rutaBase}index.html"><i class="fa-solid fa-bookmark"></i> Tema 0: Introducción</a></li>
                <li><a href="${rutaBase}contenido/tema-1.html"><i class="fa-solid fa-bookmark"></i> Tema 1: Análisis y costes de algoritmos</a></li>
                <li><a href="${rutaBase}contenido/tema-2.html"><i class="fa-solid fa-bookmark"></i> Tema 2: Recursividad</a></li>
                <li><a href="${rutaBase}contenido/tema-3.html"><i class="fa-solid fa-bookmark"></i> Tema 3: Árboles y ABB</a></li>
            </ul>
        </nav>
        <h2>Ejercicios</h2>
        <ul>
            <li><a href="${rutaBase}ejercicios/ejercicio-0.html"><i class="fa-solid fa-dumbbell"></i> Ejercicio 0: Introducción al repositorio</a></li>
            <li><a href="${rutaBase}ejercicios/ejercicio-1.html"><i class="fa-solid fa-dumbbell"></i> Ejercicio 1: Actualizar proyecto y entregas</a></li>
            <li><a href="${rutaBase}ejercicios/ejercicio-2.html"><i class="fa-solid fa-dumbbell"></i> Ejercicio 2: Descendiente de GameObject</a></li>
            </ul>
    `;

    // Inicializamos la lógica del tema una vez inyectado el HTML del menú
    inicializarTema();
}

// =========================================================
// GESTOR DE ESTADO DEL MODO OSCURO
// =========================================================
function inicializarTema() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const themeIcon = document.getElementById('theme-icon');

    // Función auxiliar para cambiar el icono de FontAwesome
    const actualizarIcono = (isDark) => {
        if (isDark) {
            themeIcon.className = 'fa-solid fa-sun'; // Sol para volver al modo claro
        } else {
            themeIcon.className = 'fa-solid fa-moon'; // Luna para activar el modo oscuro
        }
    };

    // Comprobamos el estado inicial ya aplicado en el script del head
    const isDarkInitial = document.documentElement.classList.contains('dark-mode');
    actualizarIcono(isDarkInitial);

    // Escuchador de clics
    themeToggleBtn.addEventListener('click', () => {
        const isDarkNow = document.documentElement.classList.toggle('dark-mode');
        actualizarIcono(isDarkNow);
        
        // Almacenamos la preferencia del usuario permanentemente
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    });
}

// =========================================================
// GRÁFICO TEMA 1: COMPLEJIDAD BIG O
// =========================================================
const canvasComplejidad = document.getElementById('grafo-complejidad');
if (canvasComplejidad) {
    const ctxComplejidad = canvasComplejidad.getContext('2d');
    const labels = Array.from({length: 20}, (_, i) => i + 1);

    const dataO1 = labels.map(() => 5); 
    const dataOLogN = labels.map(n => Math.log2(n) * 10 + 2); 
    const dataON = labels.map(n => n); 
    const dataONLogN = labels.map(n => n * Math.log2(n) + n); 
    const dataON2 = labels.map(n => Math.pow(n, 2) / 2);

    new Chart(ctxComplejidad, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'O(1) Constante', data: dataO1, borderColor: '#38a169', backgroundColor: 'transparent', tension: 0.4 },
                { label: 'O(log n) Logarítmica', data: dataOLogN, borderColor: '#3182ce', backgroundColor: 'transparent', tension: 0.4 },
                { label: 'O(n) Lineal', data: dataON, borderColor: '#d69e2e', backgroundColor: 'transparent', tension: 0.4 },
                { label: 'O(n log n) Cuasilineal', data: dataONLogN, borderColor: '#dd6b20', backgroundColor: 'transparent', tension: 0.4 },
                { label: 'O(n²) Cuadrática', data: dataON2, borderColor: '#e53e3e', backgroundColor: 'transparent', tension: 0.4 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Crecimiento de Operaciones según Entrada (n)' }
            },
            scales: {
                y: { min: 0, max: 100, title: { display: true, text: 'Operaciones / Tiempo' } },
                x: { title: { display: true, text: 'Datos de Entrada (n)' } }
            },
            elements: { point: { radius: 0 } } 
        }
    });
}