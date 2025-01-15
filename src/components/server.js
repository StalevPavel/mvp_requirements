export const login = async (username, password) => {
    try {
        const response = await fetch(`/login?username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Проверяем, успешен ли ответ
        if (response.ok) {
            return {
                status: response.status,
                message: response.statusText, // Возвращаем "OK" или другой статус текста
            };
        } else {
            return {
                status: response.status,
                message: response.statusText || 'Неизвестная ошибка',
            };
        }
    } catch (error) {
        console.error('Ошибка сети или запроса:', error.message);
        return {
            status: 500,
            message: 'Ошибка сети. Попробуйте позже.',
        };
    }
};
