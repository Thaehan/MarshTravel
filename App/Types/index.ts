import {MapMarkerProps} from 'react-native-maps';

export interface IPaginationData<T> {
  list?: T[];
  page?: number;
  totalPage?: number;
}

export interface IResponse<T> {
  message: string;
  data?: T;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUserInformation {
  id: string;
  username: string;
  name: string;
  email: string;
  dateOfBirth: string;
  avatar: string;
  phoneNumber?: string;
}

export interface LoginResponseData extends IToken {
  isNewAccount?: boolean;
}

export interface IUser extends IToken, IUserInformation {}

export interface InfinityList<T> {
  data: T[];
  firstLoad?: boolean;
  hasNextPage?: boolean;
  total?: number;
  page?: number;
}

export interface ISelectItem<T> {
  label: string;
  value: T;
}

export interface IMarkPoint extends MapMarkerProps {}

export type IDestination = {
  place_id: string;
  name: string;
  description?: string;
  location: {
    lat: number;
    lng: number;
  };
  mapsSearchDetails?: {
    current_opening_hours?: any;
    business_status: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: {
      open_now: boolean;
    };
    photos?: {
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }[];
    place_id: string;
    plus_code?: {
      compound_code: string;
      global_code: string;
    };
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
  };
  mapsFullDetails?: {
    website: string;
    business_status: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: {
      open_now: boolean;
    };
    current_opening_hours?: {
      open_now: boolean;
      periods: {
        close: {
          day: number;
          time: string;
        };
        open: {
          day: number;
          time: string;
        };
      }[];
      weekday_text: string[];
    };
    photos?: {
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }[];
    place_id: string;
    plus_code?: {
      compound_code: string;
      global_code: string;
    };
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
  };
  reviews: any[];
  isRegistered: boolean;
};

export interface ITripDestination {
  id: string;
  position: number;
  type: 'rest' | 'destination';
  details: IDestination;
  transportation?: ITransportation;
  name?: string;
  image_urls?: Array<string>;
  place_id?: string;
  location?: {
    lat: number;
    lng: number;
  };
  distanceFromLastDestination?: number;
  timeFromLastDestination?: number;
  mapsFullDetails?: {
    current_opening_hours?: any;
    business_status: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: {
      open_now: boolean;
    };
    photos?: {
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }[];
    place_id: string;
    plus_code?: {
      compound_code: string;
      global_code: string;
    };
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
  };
  mapsSearchDetails?: {
    current_opening_hours?: any;
    business_status: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: {
      open_now: boolean;
    };
    photos?: {
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }[];
    place_id: string;
    plus_code?: {
      compound_code: string;
      global_code: string;
    };
    rating: number;
    reference: string;
    types: string[];
    user_ratings_total: number;
  };
}

export interface ITripDay {
  id: string;
  tripId: string;
  position: number; //Position number in Trip
  startOffsetFromMidnight: number; // Tính startOffsetFromMidnight từ 0:00 - cố định múi giờ Việt Nam  = startTime.getTime() - midnight.getTime();
  destinations: ITripDestination[];
  firstDestinationName?: string;
}

export interface ITrip {
  id: string;
  userId: string;
  name: string;
  startAt: string;
  days?: ITripDay[];
  isArchived?: boolean;
  description?: string;
  daysLength?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateTripObject {
  name: string;
  startAt: string;
  initialStartOffsetFromMidnight: number;
  tripLength: number;
  description?: string;
}

export type ITransportation = 'car' | 'bus' | 'walking' | 'bicycle';

export type Comment = {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  likeCount: number;
  liked: boolean;
};

export type Review = {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  destination: {
    place_id: string;
    name: string;
    address: string;
    province_code: string;
    province_name: string;
  };
  title: string;
  description: string;
  rating: number;
  likes_count: number;
  liked: boolean;
  saved: boolean;
  comments_count: number;
  highlighted_comments: Array<Comment>;
  imageURLs: Array<string>;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  isApproved: boolean;
};

export interface SavedReview {
  id: string;
  title: string;
  rating: number;
  firstImageURL: string;
  destination: {
    id: string;
    name: string;
  };
}

export interface GoogleMapImage {
  height: number;
  width: number;
  photo_reference: string;
}

export interface Province {
  code: string;
  name: string;
  name_en: string;
  explore_tags: Array<string>;
  imageURL: string;
  followed: boolean;
}

export type CategoryId =
  | 'amusement_park'
  | 'beach'
  | 'lake'
  | 'old_quarter'
  | 'cityscape'
  | 'shopping_mall'
  | 'pagoda_temple'
  | 'landscape'
  | 'nightlife'
  | 'famous_place'
  | 'museum'
  | 'park'
  | 'cafe'
  | 'restaurant'
  | 'historical_monuments';

export interface IProvinceCategoryList {
  name: string;
  id: CategoryId;
  list: IDestination[];
}

export interface IProvinceSuggestResponse {
  name: string;
  code?: string;
  followed?: boolean;
  listRating: Array<IDestination>;
  categories: Array<IProvinceCategoryList>;
}
