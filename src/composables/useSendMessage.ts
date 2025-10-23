import { sleep } from '@/helpers/sleep';
import type { MessageInterface } from '@/interfaces/chat-message.interface';
import type { YesOrNot } from '@/interfaces/yes-or-not.interface';
import { ref } from 'vue';

export const useSendMessage = (sms: MessageInterface[] = []) => {
  const messages = ref<MessageInterface[]>(sms || []);

  const fetchYesOrNot = async () => {
    const response = await fetch('https://yesno.wtf/api');
    const data = (await response.json()) as YesOrNot;
    return data;
  };

  const sendMessage = async (text: string) => {
    if (text.trim() === '') return;

    messages.value.push({
      id: new Date().getTime(),
      message: text,
      isSender: true,
    });

    if (!text.endsWith('?')) return;

    try {
      messages.value.push({
        id: new Date().getTime() + 0.5,
        message: 'Typing...',
        isSender: false,
        imageUrl: '',
      });

      await sleep(1);

      messages.value = messages.value.filter((msg) => msg.message !== 'Typing...');

      const { answer, image } = await fetchYesOrNot();

      messages.value.push({
        id: new Date().getTime() + 1,
        message: answer,
        isSender: false,
        imageUrl: image,
      });
    } catch (error) {
      throw new Error('Failed to fetch response');
    }
  };

  return {
    messages,
    sendMessage,
  };
};
