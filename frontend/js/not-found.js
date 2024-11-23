export function renderNotFoundPage() {
    const page = document.createElement('div');
    page.className = 'not-found';
    page.innerHTML = `
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
         <btn class="btn">Go to Home</btn>
    `;

    const btn = page.querySelector('btn');
    btn.addEventListener('click', () => {
        window.location.href = '/';
    });

    return page;
}