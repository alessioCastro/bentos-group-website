/**
 * Envia uma notificação para o serviço NTFY.
 */
/**
 * Envia uma notificação para o serviço NTFY.
 */
export async function sendToNtfy(title, message, priority = 'default', tags = '') {
    try {
        const response = await fetch('https://ntfy.sh/bentos-group-tvq-pb-101', {
            method: 'POST',
            // We use text/plain to avoid complex CORS pre-flight issues
            body: message,
            headers: {
                Title: title,
                // Optional: set priority to ensure the notification appears
                Priority: priority,
                Tags: tags
            }
        });

        if (!response.ok) {
            throw new Error(`Ntfy error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending to Ntfy:", error);
    }
}

export function scrollToChatBottom() {
    const messageList = document.querySelector('.chat-messages');
    // Timeout para garantir que o DOM já renderizou a nova div
    setTimeout(() => {
        messageList.scrollTo({
            top: messageList.scrollHeight,
            behavior: 'smooth'
        });
    }, 50);
}