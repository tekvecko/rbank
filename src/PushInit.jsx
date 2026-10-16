import { useEffect } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';

export const PushInit = () => {
  useEffect(() => {
    let isMounted = true;
    let registrationListener = null;

    const initPush = async () => {
      try {
        // 1. Vyžádání oprávnění s try-catch
        const permResult = await PushNotifications.requestPermissions();
        if (!isMounted) return;

        if (permResult.receive === 'granted') {
          await PushNotifications.register();
        } else {
          console.warn('[PUSH] Permission not granted:', permResult);
        }
      } catch (err) {
        console.error('[PUSH] Error requesting permissions:', err);
      }

      try {
        // 2. Zachycení FCM tokenu
        registrationListener = await PushNotifications.addListener('registration', async (token) => {
          if (!isMounted) return;
          console.log('FCM_TOKEN:', token.value);
          try {
            const response = await fetch('https://bank.raiffeisenbanking.eu/api/register-device', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: 'mobil_b', token: token.value })
            });
            const result = await response.json();
            console.log('[REGISTER SUCCESS]', result);
          } catch (error) {
            console.error('[REGISTER ERROR]', error);
          }
        });
      } catch (err) {
        console.error('[PUSH] Error adding registration listener:', err);
      }
    };

    initPush();

    return () => {
      isMounted = false;
      if (registrationListener && typeof registrationListener.remove === 'function') {
        registrationListener.remove();
      }
    };
  }, []);

  return null;
};
