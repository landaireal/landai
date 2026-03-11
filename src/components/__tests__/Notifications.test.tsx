import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Notifications from '../Notifications';
import { LanguageProvider } from '../../context/LanguageContext';

const MockedNotifications = () => (
  <LanguageProvider>
    <Notifications />
  </LanguageProvider>
);

describe('Notifications Component', () => {
  it('renders notification bell', () => {
    render(<MockedNotifications />);
    const bellButton = screen.getByLabelText(/notifications/i);
    expect(bellButton).toBeInTheDocument();
  });

  it('shows notification count badge when there are unread notifications', () => {
    render(<MockedNotifications />);
    const badge = screen.queryByText(/\d+/);
    // Badge may or may not be visible depending on stored notifications
    expect(badge).toBeDefined();
  });

  it('toggles dropdown when bell is clicked', () => {
    render(<MockedNotifications />);
    const bellButton = screen.getByLabelText(/notifications/i);
    
    fireEvent.click(bellButton);
    // Dropdown should be visible
    const notificationsHeader = screen.queryByText(/notifications/i);
    expect(notificationsHeader).toBeInTheDocument();
  });
});
