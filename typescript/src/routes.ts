import { Response, Request } from 'express';

import createUser from './services/CreateUser';

export function hellowWorld(request: Request, response: Response) {
    const user = createUser({
        name: 'igor',
        email: 'igor@email.com',
        password: '123456',
        techs:['Java',
        {
            title: 'Angular',
            experience:8
        }]
    });

    return response.json(user);
}