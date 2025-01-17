export const login = async (username, password) => {
    try {
        const response = await fetch(`/login?username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
        const role = currentRole()
            return {
                status: response.status,
                message: response.statusText,
                role: role
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

export const currentRole = async () => {
    try {
        const response = await fetch('/api/user/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            return {
                status: response.status,
                message: response.statusText,
                data,
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

export const project = async () => {
    try {
        const response = await fetch('/api/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            return {
                status: response.status,
                message: response.statusText,
                data,
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

export const deleteProject = async (projectId, setProjectsList) => {
    try {
        const response = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            setProjectsList((prevProjects) =>
                prevProjects.filter((project) => project.projectId !== projectId)
            );
        } else {
            console.error('Ошибка удаления проекта:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка сети при удалении проекта:', error.message);
    }
};

export const submitProjects = async (project, setIsLoading, handleButtonClick) => {
    setIsLoading(true);
    try {
        const response = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        if (response.ok) {
        } else {
            const errorResponse = await response.json();
            alert(`Ошибка при добавлении проекта: ${errorResponse.message}`);
        }
    } catch (error) {
        alert('Ошибка сети: не удалось добавить проект.');
        console.error('Ошибка:', error);
    } finally {
        setIsLoading(false);
        handleButtonClick('Проекты','projects')
    }
};

export const editProjects = async (projectID, project, handleButtonClick) => {
    try {
        const response = await fetch(`/api/projects/${projectID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        if (response.ok) {
        } else {
            const errorResponse = await response.json();
            alert(`Ошибка при изменении проекта: ${errorResponse.message}`);
        }
    } catch (error) {
        alert('Ошибка сети: не удалось изменить проект.');
        console.error('Ошибка:', error);
    } finally {
        handleButtonClick('Проекты','projects')
    }
};

export const archiveProjects = async (projectID, handleButtonClick) => {
    try {
        const response = await fetch(`/api/projects/archive/${projectID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
        } else {
            const errorResponse = await response.json();
            alert(`Ошибка при архивировании проекта: ${errorResponse.message}`);
        }
    } catch (error) {
        alert('Ошибка сети: не удалось архивировать проект.');
        console.error('Ошибка:', error);
    } finally {
        handleButtonClick('Проекты','projects')
    }
};

export const requirement = async (projectID) => {
    try {
        const response = await fetch(`/api/projects/${projectID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            return {
                status: response.status,
                message: response.statusText,
                data,
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

export const editRequirements = async (requirementID, requirement) => {
    try {
        const response = await fetch(`/api/requirements/${requirementID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requirement),
        });

        if (response.ok) {
        } else {
            const errorResponse = await response.json();
            alert(`Ошибка при изменении требования: ${errorResponse.message}`);
        }
    } catch (error) {
        alert('Ошибка сети: не удалось изменить требование.');
        console.error('Ошибка:', error);
    }
};

export const requirementInfo = async (requirementID, setRequirementInfo) => {
    try {
        const response = await fetch(`/api/requirements/${requirementID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            setRequirementInfo(data.data)
            return {
                status: response.status,
                message: response.statusText,
                data,
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
export const requirements = async () => {
    try {
        const response = await fetch('/api/requirements', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            const data = await response.json();
            return {
                status: response.status,
                message: response.statusText,
                data,
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
export const submitRequirement = async (requirementData) => {
    try {
        const response = await fetch('http://localhost:8080/api/requirements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requirementData),
        });

        if (!response.ok) {
            return {
                status: response.status,
                message: response.statusText || 'Ошибка добавления требования',
            };
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка сети:', error.message);
        return {
            status: 500,
            message: 'Ошибка сети. Попробуйте позже.',
        };
    }
};

