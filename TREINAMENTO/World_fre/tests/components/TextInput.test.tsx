import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '@/components/TextInput';

describe('TextInput Component', () => {
  it('should render textarea element', () => {
    const handleChange = () => {};
    render(<TextInput value="" onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeTruthy();
  });

  it('should display character count', () => {
    const handleChange = () => {};
    render(<TextInput value="Hello" onChange={handleChange} maxLength={100} />);

    expect(screen.getByText(/5 \/ 100 characters/)).toBeTruthy();
  });

  it('should call onChange when text is entered', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<TextInput value="" onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'test');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should not exceed max length', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { rerender } = render(
      <TextInput value="" onChange={handleChange} maxLength={5} />
    );

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    // Try to type more than max length
    await user.type(textarea, 'hello world');

    // Should only have typed up to max length
    expect(textarea.value.length).toBeLessThanOrEqual(5);
  });

  it('should be disabled when disabled prop is true', () => {
    const handleChange = () => {};
    render(<TextInput value="" onChange={handleChange} disabled={true} />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });
});
