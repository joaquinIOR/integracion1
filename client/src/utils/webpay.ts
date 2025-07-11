export const redirectToWebpay = (url: string, token: string) => {
    // Crear un formulario en memoria
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    
    // Crear un input para el token
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token_ws';
    tokenInput.value = token;

    // Añadir el input al formulario
    form.appendChild(tokenInput);

    // Añadir el formulario al body y enviarlo
    document.body.appendChild(form);
    form.submit();
};