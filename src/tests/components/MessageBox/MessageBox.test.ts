import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MessageBox from '@/components/MessageBox/MenssageBox.vue';

const wrapper = mount(MessageBox);

describe('MessageBox component', () => {
  it('should render MessageBox component corrrectly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit message when form is submitted', async () => {
    const input = wrapper.get('input');
    await input.setValue('Test message');
    const button = wrapper.get('button');
    await button.trigger('click');

    const emitted = wrapper.emitted('sendMessage');
    expect(emitted).toBeTruthy();
    console.log(emitted);
    expect(emitted?.[0]).toEqual(['Test message']);
  });

  it('should not emit message when input is empty', async () => {
    const wrapper = mount(MessageBox);
    const button = wrapper.get('button');
    await button.trigger('click');

    const emitted = wrapper.emitted('sendMessage');
    expect(emitted).toBeFalsy();
  });

  it('should clear input after message is sent', async () => {
    const wrapper = mount(MessageBox);
    const input = wrapper.get('input');
    await input.setValue('Another test message');
    const button = wrapper.get('button');
    await button.trigger('click');

    expect((input.element as HTMLInputElement).value).toBe('');
  });
});
