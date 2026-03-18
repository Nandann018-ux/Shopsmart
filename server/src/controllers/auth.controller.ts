import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, role } = req.body;
        const user = await AuthService.registerUser(email, password, role);
        res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email, role: user.role } });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await AuthService.loginUser(email, password);
        res.json({ message: 'Login successful', token, user: { id: user.id, email: user.email, role: user.role } });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        res.json({ user: req.user });
    } catch (error: any) {
        res.status(500).json({ error: 'Server error' });
    }
};
