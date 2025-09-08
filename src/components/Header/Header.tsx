// src/components/Header/Header.tsx
import React from 'react';
import './Header.css';

/**
 * Application header with title and navigation elements
 * @param {Object} props - Component props
 * @param {string} props.title - Main application title to display in header
 * @param {string} props.subtitle - Optional subtitle or tagline for additional context
 */
interface HeaderProps {
    title: string;
    subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="app-header">
            <div className="header-content">
                <h1 className="header-title">{title}</h1>
                {subtitle && <p className="header-subtitle">{subtitle}</p>}
            </div>
            <nav className="header-nav">
                <button className="nav-button active">Dashboard</button>
                <button className="nav-button">Analytics</button>
                <button className="nav-button">Settings</button>
            </nav>
        </header>
    );
};

export default Header;
