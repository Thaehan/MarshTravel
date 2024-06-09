import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';

const ref = React.createRef<BottomSheetModal>();

export default function useAddDestinationModal() {
  const present = (data?: any) => {
    ref?.current?.present(data);
  };

  const close = () => {
    ref?.current?.close();
  };

  return {
    ref,
    present,
    close,
  };
}
