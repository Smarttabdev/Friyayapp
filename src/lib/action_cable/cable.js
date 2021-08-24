import { createConsumer } from '@rails/actioncable';
import Cookies from 'js-cookie';

const getCableUrl = () => {
  const token = Cookies.get('authToken');
  const tenant = location.hostname.split('.')[0];
  return `${window.CABLE_URL}?auth_token=${token}&tenant=${tenant}`;
};

export const consumer = createConsumer(getCableUrl);
