import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {useEffect} from 'react';
import {AppState, Platform, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import CodePush from 'react-native-code-push';
import {QueryClient, QueryClientProvider} from 'react-query';
import {multiply} from 'react-native-calendar-module';

import AppNavigator from '@Navigations/MainNavigation';
import useFirebase from '@Hooks/firebase';
import {store, persistor} from '@Store/Store';
import Loading from '@Components/Loading/Loading';
import './App/Themes';
import './App/Languages';
import {translate} from './App/Languages';

const queryClient = new QueryClient();

function App() {
  const prepare = async () => {
    //Set status bar state
    if (Platform.OS == 'android') {
      AppState.addEventListener('focus', () => {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setBarStyle('dark-content');
        StatusBar.setTranslucent(true);
      });
    }
    //setup firebase
    await useFirebase();
    console.log(await multiply(5, 10));
  };

  const codepushCheck = () => {
    CodePush.sync({
      installMode: CodePush.InstallMode.ON_NEXT_RESUME,
      mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESUME,
      updateDialog: {
        title: translate('util.updateTitle'),
        mandatoryUpdateMessage: translate('util.updateDescription'),
      },
    });
  };

  useEffect(() => {
    codepushCheck();
    prepare();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <QueryClientProvider client={queryClient}>
            <StatusBar />
            <Loading />
            <AppNavigator />
            <FlashMessage />
          </QueryClientProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default CodePush(App);
