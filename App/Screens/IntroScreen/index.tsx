import {
  Carousel,
  Colors,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';
import {Image} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import MainContainer from '@Containers/MainContainer';
import CustomButton from '@Components/CustomButton';
import ScreenNames from '@Constants/ScreenNames';
import styles from './styles';
import Dot from '@Components/Dot';
import {translate} from '@Languages/index';
import {useLanguages} from '@Hooks/languages';
import { setShowIntro } from '@Store/Slices/SystemSlice';
import { IRootState } from '@Store/Store';

export default function IntroScreen(nav: NativeStackScreenProps<any>) {
  const {navigation, route} = nav;
  const user = useSelector((state: IRootState) => state.user)
  const system = useSelector((state: IRootState) => state.system)
  const dispatch = useDispatch()
  const {initLanguage} = useLanguages();
  const carouselRef = useRef<any>(null);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    initLanguage();
    if (!system.showIntro && user.accessToken) {
      navigation.replace(ScreenNames.MainTab);
      return;
    }
    if (!system.showIntro && !user.accessToken) {
      navigation.replace(ScreenNames.Login);
      return;
    }
  }, []);

  useEffect(() => {
    carouselRef.current?.goToPage(page, true);
  }, [page]);

  const renderPageNavigation = () => {
    return (
      <View centerV row spread height={'10%'} bg-white paddingB-20 paddingH-12>
        <View row width="30%">
          {[0, 1, 2].map((item, index) => {
            return (
              <Dot
                key={index}
                color={index == page ? Colors.primary : Colors.grey50}
                size={7}
                marginH={4}
              />
            );
          })}
        </View>
        {page == 0 && (
          <CustomButton
            label={translate('intro.getStarted')}
            onPress={() => setPage(1)}
            textStyle={styles.textStyle}
            containerStyle={styles.buttonStyle}
          />
        )}
        {page == 1 && (
          <TouchableOpacity
            bg-white
            style={{borderRadius: 100}}
            onPress={() => setPage(pre => pre + 1)}>
            <AntDesign
              name="arrowright"
              size={36}
              style={{padding: 6, color: Colors.primary}}
            />
          </TouchableOpacity>
        )}
        {page == 2 && (
          <CustomButton
            label={translate('intro.startNow')}
            onPress={() => {
              navigation.replace(ScreenNames.Login);
              dispatch(setShowIntro(false));
            }}
            textStyle={styles.textStyle}
            containerStyle={styles.buttonStyle}
          />
        )}
      </View>
    );
  };

  const renderPage1 = () => {
    return (
      <View flexG bg-white style={{position: 'relative'}}>
        <Image
          style={{height: '80%', width: '100%'}}
          source={require('@Assets/Images/Intro1.jpg')}
        />
        <View width="100%" height={'20%'} paddingH-12 paddingT-8>
          <Text semiBold xl>
            {translate('intro.introt1')}
          </Text>
          <Text regular lg>
            {translate('intro.intro1')}
          </Text>
        </View>

        <View style={styles.logo}></View>
      </View>
    );
  };
  const renderPage2 = () => {
    return (
      <View flexG bg-white>
        <Image
          style={{height: '80%', width: '100%'}}
          source={require('@Assets/Images/Intro2.jpg')}
        />
        <View width="100%" height={'20%'} paddingH-12 paddingT-8>
          <Text semiBold xl>
            {translate('intro.introt2')}
          </Text>
          <Text regular lg>
            {translate('intro.intro2')}
          </Text>
        </View>

        <View style={styles.logo}></View>
      </View>
    );
  };
  const renderPage3 = () => {
    return (
      <View flexG bg-white>
        <Image
          style={{height: '80%', width: '100%'}}
          source={require('@Assets/Images/Intro3.jpg')}
        />
        <View width="100%" height={'20%'} paddingH-12 paddingT-8>
          <Text semiBold xl>
            {translate('intro.introt3')}
          </Text>
          <Text regular lg>
            {translate('intro.intro3')}
          </Text>
        </View>

        <View style={styles.logo}></View>
      </View>
    );
  };

  return (
    <MainContainer isFullScreen>
      <View style={styles.layout}>
        <View flex center height={'90%'}>
          <Carousel
            initialPage={page}
            onChangePage={(pageIndex: number) => setPage(pageIndex)}
            ref={carouselRef}
            style={{height: '90%'}}>
            {renderPage1()}
            {renderPage2()}
            {renderPage3()}
          </Carousel>
        </View>
        {renderPageNavigation()}
      </View>
    </MainContainer>
  );
}
