import React, { useState } from 'react';
import './AddProject.css';

const AddProject = () => {
    const [projectName, setProjectName] = useState('');
    const [developer, setDeveloper] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});

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
            console.log({
                projectName,
                developer,
                description,
                startDate,
                endDate,
            });

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
                />
            </div>
            <div className="form-group">
                <label htmlFor="developer">Разработчик:</label>
                <input
                    id="developer"
                    type="text"
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
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
                />
            </div>
            <div className="form-group">
                <label htmlFor="endDate">Дата окончания:</label>
                <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button type="submit" className="add-project-button" disabled={!isFormValid()}>
                Добавить проект
            </button>
        </form>
    );
};

export default AddProject;
