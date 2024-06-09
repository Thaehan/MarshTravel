import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import {IRootState} from '@Store/Store';
import ShowMessage from '@Utils/Message';
import {translate} from '@Languages/index';

export default function useMapView(nav: NativeStackScreenProps<any>) {
  const currentLocation = useSelector(
    (state: IRootState) => state.system.location,
  );
  const informationBottomSheetRef = useRef<BottomSheetModal>(null);

  const handleNotAvailableDirection = (errorData: any) => {
    ShowMessage(translate('util.noMapDirection'), 'warning');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      informationBottomSheetRef.current?.present();
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return {
    currentLocation,
    handleNotAvailableDirection,
    informationBottomSheetRef,
  };
}
