import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatMessages from '@/components/ChatMessages/ChatMessages.vue';
import type { MessageInterface } from '@/interfaces/chat-message.interface';

const messages: MessageInterface[] = [
  { id: 1, message: 'Hello World', isSender: false, imageUrl: 'http://example.com/image1.png' },
  { id: 2, message: 'Hi there!', isSender: true },
];

describe('ChatMessages component', () => {
  it('should render ChatMessages component correctly', () => {
    const wrapper = mount(ChatMessages);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render messages when provided', () => {
    const wrapper = mount(ChatMessages, {
      props: { messages },
    });

    expect(wrapper.text()).toContain('Hello World');
    expect(wrapper.text()).toContain('Hi there!');
    expect(wrapper.findAll('img').length).toBe(1);
  });

  it('should scroll to bottom when new messages are added', async () => {
    vi.useFakeTimers();
    const scrollToMock = vi.fn();

    const wrapper = mount(ChatMessages, {
      props: { messages: [] },
    });

    const chatDiv = wrapper.get('[data-test="chatDiv"]');
    Object.defineProperty(chatDiv.element, 'scrollHeight', { value: 1000, configurable: true });
    chatDiv.element.scrollTo = scrollToMock;
    await wrapper.setProps({ messages });
    vi.advanceTimersByTime(200);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 1000, behavior: 'smooth' });

    vi.useRealTimers();
  });
});
