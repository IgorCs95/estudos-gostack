import { Router } from 'express';
import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const creatUser = new CreateUserService();

        const user = await creatUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default usersRouter;
