export function showAlert(message) {
    const alertBox = document.getElementById('alert-box');
    alertBox.textContent = message;
    alertBox.classList.add('show');
    
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}
