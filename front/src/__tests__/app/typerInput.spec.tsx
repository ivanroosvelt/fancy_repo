import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoModal } from '../../app/typeracer/components/modal/modal';

describe('typeracer', () => {
  it('should render modal', () => {
    const inputElement = render(
      <InfoModal
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
        modalData={{
          visible: true,
          title: 'title',
          content: 'content'
        }}
      />
    );
    expect(inputElement).toMatchSnapshot();
  });
});
