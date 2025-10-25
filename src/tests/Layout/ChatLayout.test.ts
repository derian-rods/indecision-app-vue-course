import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatLayout from '@/Layout/ChatLayout.vue';

const wrapper = mount(ChatLayout);

describe('ChatLayout Component', () => {
  it('should render the ChatLayout component', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
