import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';

async function getFirebaseToken() {
  try {
    await notifee.requestPermission();
    await messaging().requestPermission();
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('token', token);
  } catch (error) {
    console.error('error on get firebase token', error);
  }
}

async function handleRecieveMessage() {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'default',
      importance: AndroidImportance.HIGH,
    });

    //Foreground event touch
    notifee.onForegroundEvent(({type, detail}) => {
      console.log('foreground event touch');
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    //Background event touch
    notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log('background event touch');
    });

    //Default open app on click FCM message
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App open');
    });

    //Default handle FCM message on foreground
    messaging().onMessage(async message => {
      console.log('foreground FCM', message);
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        android: {
          channelId: channelId,
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
          // style: {
          //   type: AndroidStyle.BIGPICTURE,
          //   picture: message.notification?.android?.imageUrl ?? '',
          // },
          // actions: [
          //   {
          //     title: '<b>Dance</b> &#128111;',
          //     pressAction: {id: 'dance'},
          //   },
          //   {
          //     title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
          //     pressAction: {id: 'cry'},
          //   },
          // ],
        },
      });
    });

    //Default handle FCM message on background
    messaging().setBackgroundMessageHandler(async message => {
      console.log('background FCM', message);
      await notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
        android: {
          channelId: channelId,
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: message.notification?.android?.imageUrl ?? '',
          },
          // actions: [
          //   {
          //     title: '<b>Dance</b> &#128111;',
          //     pressAction: {id: 'dance'},
          //   },
          //   {
          //     title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
          //     pressAction: {id: 'cry'},
          //   },
          // ],
        },
      });
    });
  } catch (error) {
    console.error('error on sethandler', error);
  }
}

export default async function useFirebase() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  await getFirebaseToken();
  await handleRecieveMessage();
}
