import { notification } from 'antd';

export const useEmailProvider = () => {
  const openEmailProvider = (email: string) => {
    if (!email) {
      notification.error({ message: 'Unable to determine email provider.' });
      return;
    }

    const emailDomain = email.split('@')[1];
    const emailUser = email.split('@')[0];

    // Map of email providers and their URLs
    const emailProviders: Record<string, string> = {
      'gmail.com': 'https://mail.google.com/',
      'yahoo.com': 'https://mail.yahoo.com/',
      'outlook.com': 'https://outlook.live.com/',
      'hotmail.com': 'https://outlook.live.com/',
      'yopmail.com': `https://yopmail.com/?${emailUser}`,
    };

    // Check if we have a direct mapping for the domain
    const providerUrl = emailProviders[emailDomain];
    if (providerUrl) {
      window.open(providerUrl, '_blank');
      return;
    }

    // Fallback to generic mailto link
    window.location.href = `mailto:${email}`;
  };

  return { openEmailProvider };
};
