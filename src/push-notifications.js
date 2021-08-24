import { getToken } from 'Lib/ApiRequest';

window.addEventListener('TipHiveJS:authToken', function(event) {
  const { authToken } = event.detail;
  navigator.serviceWorker.ready.then(registration => {
    registration.pushManager.getSubscription(subscription => {
      console.log('TipHiveJS:authToken event authToken', authToken);
      subscription && sendSubscription(subscription, authToken);
    });
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      navigator.serviceWorker.ready.then(init);
    });
  });
}

export function init(registration) {
  if (!('Notification' in window)) {
    console.error('Desktop notification not supported.');
    return;
  }

  if (Notification.permission === 'denied') {
    console.error('User blocked notifications.');
    return;
  }

  if (!('showNotification' in registration)) {
    console.error('showNotification not supported.');
    return;
  }

  if (!('pushManager' in registration)) {
    console.error('pushManager not supported.');
    return;
  }

  if (!window.WEBPUSH_PUBLIC_KEY) {
    console.error('Missing WEBPUSH_PUBLIC_KEY environment variable.');
    return;
  }

  return subscribe(registration, window.WEBPUSH_PUBLIC_KEY);
}

function subscribe(registration, serverKey) {
  return registration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(serverKey)
    })
    .then(handleSubscription)
    .catch(function(err) {
      console.error('Push subscription failed.', err);
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(subscribe(registration, serverKey));
        }, 5000);
      });
    });
}

function handleSubscription(subscription) {
  const authToken = getToken();
  if (authToken) {
    return sendSubscription(subscription, authToken);
  }
}

function sendSubscription(subscription, authToken) {
  return fetch(window.API_URL + '/notifications/push_subscription', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ subscription })
  });
}

function urlBase64ToUint8Array(str) {
  const padding = '='.repeat((4 - (str.length % 4)) % 4);
  const b64 = (str + padding).replaceAll('_', '/').replaceAll('-', '+');
  const raw = atob(b64);
  const ar = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) {
    ar[i] = raw.charCodeAt(i);
  }
  return ar;
}
