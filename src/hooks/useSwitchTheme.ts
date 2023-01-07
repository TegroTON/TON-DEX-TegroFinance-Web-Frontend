import { useState } from 'react';

export type ThemeType = ('light-mode' | 'dark-mode');

const getTheme = () => {
    return window.localStorage.getItem('theme') === 'dark-mode' ? 'dark-mode' : 'light-mode';
}

const saveTheme = (newTheme: ThemeType) => {
    window.localStorage.setItem('theme', newTheme);
}

export const useSwitchTheme = () => {
    const [theme, setTheme] = useState<ThemeType>(getTheme())
    const body = document.querySelector('body');
    if (body) body.setAttribute('class', theme);
    return () => {
        let newTheme: ThemeType = 'light-mode';
        if (theme === 'light-mode') {
            newTheme = 'dark-mode';
        }

        saveTheme(newTheme);
        setTheme(newTheme)
    };
}
