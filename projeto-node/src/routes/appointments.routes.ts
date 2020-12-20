import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
    const appontments = appointmentRepository.all();
    return response.json(appontments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentRepository,
        );

        const appointment = createAppointment.execute({
            date: parseDate,
            provider,
        });

        return response.json(appointment);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default appointmentsRouter;
