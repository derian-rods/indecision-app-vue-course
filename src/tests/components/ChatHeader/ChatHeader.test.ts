import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatHeader from '@/components/ChatHeader/ChatHeader.vue';

const wrapper = mount(ChatHeader);

describe('ChatHeader Component', () => {
  it('should be rendered', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render the title correctly', () => {
    const title = 'Indecision App';
    const wrapper = mount(ChatHeader, {
      props: { title },
    });
    const headerTitle = wrapper.find('span');
    expect(headerTitle.text()).toBe(title);
  });

  it('should render wife if message prop no exists', () => {
    const headerTitle = wrapper.find('span');
    expect(headerTitle.text()).toBe('Wife');
  });
});
