import React, { useState } from 'react';
import './AddProject.css';

const AddProject = ({submitProject, handleButtonClick}) => {
    const [projectName, setProjectName] = useState('');
    const [developer, setDeveloper] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!projectName.trim()) newErrors.projectName = 'Название проекта обязательно';
        if (!developer.trim()) newErrors.developer = 'Разработчик обязателен';
        if (!description.trim()) newErrors.description = 'Описание проекта обязательно';
        if (!startDate) newErrors.startDate = 'Дата начала обязательна';
        if (!endDate) newErrors.endDate = 'Дата окончания обязательна';
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            newErrors.endDate = 'Дата окончания не может быть раньше даты начала';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = () => {
        return (
            projectName.trim() &&
            developer.trim() &&
            description.trim() &&
            startDate &&
            endDate &&
            new Date(startDate) <= new Date(endDate)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const project = {
                name: projectName,
                developer,
                description,
                startDateTime: `${startDate}T00:00:00`,
                endDateTime: `${endDate}T23:59:59`,
            };
            submitProject(project, setIsLoading, handleButtonClick);
            setProjectName('');
            setDeveloper('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setErrors({});
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    };

    return (
        <form className="add-project-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="projectName">Название проекта:</label>
                <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="developer">Разработчик:</label>
                <input
                    id="developer"
                    type="text"
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание проекта:</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="startDate">Дата начала:</label>
                <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="endDate">Дата окончания:</label>
                <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="add-project-button"
                disabled={!isFormValid() || isLoading}
            >
                {isLoading ? 'Добавление...' : 'Добавить проект'}
            </button>
        </form>
    );
};

export default AddProject;
