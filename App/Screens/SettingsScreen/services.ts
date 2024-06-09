import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useLanguages} from '@Hooks/languages';

export default function useSettings(nav: NativeStackScreenProps<any>) {
  const {navigation, route} = nav;
  const {systemLang: currentLang, initLanguage} = useLanguages();

  const changeLanguage = () => {
    const lang = currentLang == 'en' ? 'vi' : 'en';
    initLanguage(lang);
  };

  return {
    changeLanguage,
    currentLang
  };
}
