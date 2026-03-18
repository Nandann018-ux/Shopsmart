import { prisma } from '../index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
    static async registerUser(email: string, password: string, role: string = 'USER') {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                // Using "as any" temp workaround for prisma enum mismatch if it compiles locally differently
                role: role as any,
            },
        });

        return user;
    }

    static async loginUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const secret = process.env.JWT_SECRET || 'secret';
        const token = jwt.sign({ userId: user.id, role: user.role }, secret, {
            expiresIn: '24h',
        });

        return { user, token };
    }
}
