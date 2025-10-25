import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatBubble from '@/components/ChatBubble/ChatBubble.vue';

describe('ChatBubble Component', () => {
  it('should render the chat Bubble with correct message', () => {
    const message = 'Hello, this is a test message!';
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        isSender: true,
      },
    });

    expect(wrapper.text()).toContain(message);
  });

  it('should match snapshot if sender is false', () => {
    const wrapper = mount(ChatBubble, {
      props: {
        message: 'Snapshot test message',
        isSender: false,
        imageUrl: 'https://example.com/avatar.png',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot if sender is true', () => {
    const wrapper = mount(ChatBubble, {
      props: {
        message: 'Snapshot test message',
        isSender: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
