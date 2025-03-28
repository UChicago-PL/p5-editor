import React from 'react';
import lodash from 'lodash';

import { fireEvent, render, screen, waitFor } from '../../../test-utils';
import { ToolbarComponent } from './Toolbar';

const renderComponent = (extraProps = {}) => {
  const props = lodash.merge(
    {
      isPlaying: false,
      preferencesIsVisible: false,
      stopSketch: jest.fn(),
      setProjectName: jest.fn(),
      openPreferences: jest.fn(),
      showEditProjectName: jest.fn(),
      hideEditProjectName: jest.fn(),
      infiniteLoop: false,
      autorefresh: false,
      setAutorefresh: jest.fn(),
      setTextOutput: jest.fn(),
      setGridOutput: jest.fn(),
      startSketch: jest.fn(),
      startAccessibleSketch: jest.fn(),
      saveProject: jest.fn(),
      currentUser: 'me',
      originalProjectName: 'testname',
      openSubmitModal: jest.fn(),
      closeSubmitModal: jest.fn(),

      owner: {
        username: 'me'
      },
      project: {
        name: 'testname',
        isEditingName: false,
        id: 'id'
      },
      user: {
        authenticated: true,
        username: 'me',
        id: 'XXX'
      },
      t: jest.fn()
    },
    extraProps
  );

  render(<ToolbarComponent {...props} />);

  return props;
};

describe('<ToolbarComponent />', () => {
  it('sketch owner can switch to sketch name editing mode', async () => {
    const props = renderComponent();
    const sketchName = screen.getByLabelText('Edit sketch name');

    fireEvent.click(sketchName);

    await waitFor(() => expect(props.showEditProjectName).toHaveBeenCalled());
  });

  it('non-owner can\t switch to sketch editing mode', async () => {
    const props = renderComponent({ currentUser: 'not-me' });
    const sketchName = screen.getByLabelText('Edit sketch name');

    fireEvent.click(sketchName);

    expect(sketchName).toBeDisabled();
    await waitFor(() => expect(props.showEditProjectName).not.toHaveBeenCalled());
  });

  it('sketch owner can change name', async () => {
    const props = renderComponent({ project: { isEditingName: true } });

    const sketchNameInput = screen.getByLabelText('New sketch name');
    fireEvent.change(sketchNameInput, { target: { value: 'my new sketch name' } });
    fireEvent.blur(sketchNameInput);

    await waitFor(() => expect(props.setProjectName).toHaveBeenCalledWith('my new sketch name'));
    await waitFor(() => expect(props.saveProject).toHaveBeenCalled());
  });

  it("sketch owner can't change to empty name", async () => {
    const props = renderComponent({ project: { isEditingName: true } });

    const sketchNameInput = screen.getByLabelText('New sketch name');
    fireEvent.change(sketchNameInput, { target: { value: '' } });
    fireEvent.blur(sketchNameInput);

    await waitFor(() => expect(props.setProjectName).not.toHaveBeenCalled());
    await waitFor(() => expect(props.saveProject).not.toHaveBeenCalled());
  });
});
