import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react-lite';

import {FavoriteButtonProps} from './type';
import {favoriteStore} from '../../stores/favoriteStore';

export const FavoriteButton = observer(
  ({eventId, eventSource}: FavoriteButtonProps) => {
    const isFavorited = favoriteStore.isFavorite(eventId, eventSource);

    const onPressFavorite = () => {
      favoriteStore.toggleFavorite(eventId, eventSource);
    };

    return (
      <TouchableOpacity
        className="self-start rounded-md bg-yellow-500 p-2"
        onPress={onPressFavorite}>
        <Text className="text-sm color-white">
          {isFavorited ? 'Unfavorite' : 'Favorite'}
        </Text>
      </TouchableOpacity>
    );
  },
);
