import { Router } from "express";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/NodeMailerMailAdapter";

import { PrismaFeedbacksRepository } from "./repositories/prisma/PrismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "./useCases/SubmitFeedbackUseCase";

export const routes = Router();

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodeMailerMailAdapter,
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  });

  response.status(201).send();
});