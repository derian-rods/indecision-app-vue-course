import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import IndecisionView from '@/views/IndecisionView.vue';
import ChatMessages from '@/components/ChatMessages/ChatMessages.vue';
import MenssageBox from '@/components/MessageBox/MenssageBox.vue';
import MessageBox from '@/components/MessageBox/MenssageBox.vue';

const mockChatMessages = {
  template: `<div>Mock ChatMessages</div>`,
};

describe('IndecisionView component', () => {
  it('Should render ChatMessage  and MenssageBox correctly', () => {
    const wrapper = mount(IndecisionView);
    expect(wrapper.findComponent(ChatMessages).exists()).toBeTruthy();
    expect(wrapper.findComponent(MenssageBox).exists()).toBeTruthy();
  });

  it('should handle sendMessage event from MessageBox', async () => {
    vi.useFakeTimers();

    const wrapper = mount(IndecisionView, {
      global: {
        stubs: {
          ChatMessages: mockChatMessages,
        },
      },
    });

    const message = 'hola desde el evento';
    const messageBox = wrapper.findComponent(MenssageBox);
    const ChatMessage = wrapper.findComponent(ChatMessages);

    messageBox.vm.$emit('sendMessage', message);

    vi.advanceTimersByTime(500);
    await wrapper.vm.$nextTick();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages = (wrapper.vm as any).messages;

    expect(messages.at(-1)).toMatchObject({
      message,
      isSender: true,
    });
  });
});
