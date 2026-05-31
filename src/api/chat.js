import { api } from './client';

export function sendChatMessage(exercise, messages) {
  return api.post('/chat', { exercise, messages });
}
