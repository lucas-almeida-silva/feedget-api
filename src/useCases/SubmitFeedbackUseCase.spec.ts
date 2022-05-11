import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sdfsdft4',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sdfsdft4',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:/image/png;base64,sdfsdft4',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});