import {Colors, View} from 'react-native-ui-lib';
import React, {ReactNode, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Animated as RNAnimated
} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated';

import MainLoading from '../MainLoading';

const useRefetchByUser = (refetch?: Function) => {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);

  const refetchByUser = async () => {
    setIsRefetchingByUser(false);
    try {
      refetch && (await refetch());
    } finally {
      setIsRefetchingByUser(false);
    }
  };

  return {isRefetchingByUser, refetchByUser};
};

interface IFList extends FlatListProps<any> {
  keyId?: string;
  loadMore?: () => void;
  refetch?: () => void;
  hasNextPage?: boolean;
  renderFooter?: ReactNode;
  data: any;
  contentContainerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  isReactNativeAnimated?: boolean;
  containerStyle?: RNAnimated.AnimatedProps<ViewStyle>;

}

export default function InfinityFlatList(props: IFList) {
  const {
    data,
    keyId = 'id',
    renderItem,
    refetch,
    loadMore,
    hasNextPage,
    contentContainerStyle,
    extraData,
    isLoading,
    ListEmptyComponent,
    onScroll,
    isReactNativeAnimated,
    containerStyle,
    ...rest
  }: IFList = props;

  const flatListRef = useRef<any>(null);
  useScrollToTop(flatListRef);

  const {isRefetchingByUser, refetchByUser} = useRefetchByUser(refetch);

  const handler = () => {
    
  }

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View center paddingV-8>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      );
    }
    return null;
  };

  const renderList = () => {
    if (isReactNativeAnimated) {
      return (
        <RNAnimated.FlatList
          ref={flatListRef}
          keyExtractor={(item, index) => `listItem_index_${keyId}_${index}`}
          renderItem={renderItem}
          data={data}
          extraData={extraData}
          onScroll={onScroll ?? handler}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          onRefresh={refetchByUser}
          refreshing={isRefetchingByUser}
          //@ts-expect-errors
          ListFooterComponent={hasNextPage && renderFooter}
          contentContainerStyle={[style.container, contentContainerStyle]}
          ListEmptyComponent={!isLoading ? ListEmptyComponent : <MainLoading />}
          {...rest}
        />
      );
    }

    return (
      <Animated.FlatList
        ref={flatListRef}
        keyExtractor={(item, index) => `listItem_index_${keyId}_${index}`}
        renderItem={renderItem}
        data={data}
        extraData={extraData}
        onScroll={onScroll ?? handler}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        //@ts-expect-errors
        ListFooterComponent={hasNextPage && renderFooter}
        contentContainerStyle={[style.container, contentContainerStyle]}
        ListEmptyComponent={!isLoading ? ListEmptyComponent : <MainLoading />}
        {...rest}
      />
    );
  }

  if (isReactNativeAnimated) {
    return <RNAnimated.View style={[style.listContainer, containerStyle]}>{renderList()}</RNAnimated.View>

  }

  return (
    <Animated.View style={style.listContainer}>{renderList()}</Animated.View>
  );
}

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    // paddingTop: 16,
    // marginHorizontal: 16,
    // paddingHorizontal: 16,
  },
  listContainer: {
    flex: 1,
  },
});
