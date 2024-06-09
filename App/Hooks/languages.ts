import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {IRootState} from '@Store/Store';
import {setLanguage} from '@Store/Slices/SystemSlice';

const EN_RELATIVE_TIME = {
  future: '%s seconds.',
  past: '%s seonds ago.',
  s: '1 second.',
  ss: '%s seconds.',
  m: '1 minute.',
  mm: '%d minutes.',
  h: '1 hour.',
  hh: '%d hours.',
  d: '1 day.',
  dd: '%d days.',
  M: '1 month.',
  MM: '%d months.',
  y: '1 year.',
  yy: '%d years.',
};

const VI_RELATIVE_TIME = {
  future: '%s giây.',
  past: '%s giây.',
  s: '1 giây.',
  ss: '%s giây.',
  m: '1 phút.',
  mm: '%d phút.',
  h: '1 giờ.',
  hh: '%d giờ.',
  d: '1 ngày.',
  dd: '%d ngày.',
  M: '1 tháng.',
  MM: '%d tháng.',
  y: '1 năm.',
  yy: '%d năm.',
};

export function useLanguages() {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const systemLang = useSelector((state: IRootState) => state.system.language);

  const initLanguage = (lang?: 'en' | 'vi') => {
    if (!lang) {
      const selectedLanguage = systemLang ?? 'vi';
      moment.locale(selectedLanguage, {
        relativeTime:
          selectedLanguage === 'vi' ? VI_RELATIVE_TIME : EN_RELATIVE_TIME,
      });
      i18n.changeLanguage(systemLang ?? 'vi');
    } else {
      moment.locale(lang, {
        relativeTime: lang === 'vi' ? VI_RELATIVE_TIME : EN_RELATIVE_TIME,
      });
      i18n.changeLanguage(lang);
      dispatch(setLanguage(lang));
    }
  };

  return {
    initLanguage,
    systemLang,
  };
}
