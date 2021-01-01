import { Router } from 'express';

import AutenticateUserService from '../service/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AutenticateUserService();
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
        delete user.password;

        return response.json({ user, token });
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default sessionsRouter;
