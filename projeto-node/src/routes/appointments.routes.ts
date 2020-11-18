import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parseDate = startOfHour(parseISO(date));

    if (appointmentRepository.findByDate(parseDate)) {
        return response
            .status(400)
            .json({ mesagen: 'this appointments is already booked' });
    }

    const appointment = appointmentRepository.create(provider, parseDate);

    return response.json(appointment);
});

export default appointmentsRouter;
