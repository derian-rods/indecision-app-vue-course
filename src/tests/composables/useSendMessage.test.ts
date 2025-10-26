import { describe, it, expect, vi } from 'vitest';
import { useSendMessage } from '@/composables/useSendMessage';

describe('useSendMessage composable', () => {
  it('add message correctly when onMessage is called', async () => {
    const text = 'Hola Mundo';
    const { messages, sendMessage } = useSendMessage();

    await sendMessage(text);

    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      isSender: true,
      message: text,
    });
  });

  it('add nothing if text is empty', async () => {
    const text = '';
    const { messages, sendMessage } = useSendMessage();

    await sendMessage(text);

    expect(messages.value.length).toBe(0);
  });

  it('gets her response correctly when message ends with "?"', async () => {
    const text = 'Do you wanna dinner ?';
    const { messages, sendMessage } = useSendMessage();
    await sendMessage(text);

    await new Promise((r) => setTimeout(r, 500));

    const [MyMessage, herMessage] = messages.value;

    expect(messages.value.length).toBe(2);
    expect(herMessage).toEqual({
      id: expect.any(Number),
      isSender: false,
      imageUrl: expect.any(String),
      message: expect.any(String),
    });
    expect(MyMessage).toEqual({
      id: expect.any(Number),
      isSender: true,
      message: text,
    });
  });

  it('mock response - fetch api', async () => {
    const mockResponse = { answer: 'yes', image: 'example.gif' };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse,
    }));

    const text = 'Do you wanna dinner ?';
    const { messages, sendMessage } = useSendMessage();
    await sendMessage(text);

    await new Promise((r) => setTimeout(r, 500));

    const [_, herMessage] = messages.value;

    expect(herMessage).toEqual({
      id: expect.any(Number),
      isSender: false,
      imageUrl: mockResponse.image,
      message: mockResponse.answer,
    });
  });
});
