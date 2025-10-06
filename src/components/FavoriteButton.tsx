import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react-lite';

import {favoriteStore} from '../stores/favoriteStore';
import {EventSource} from '../types/event';

interface FavoriteButtonProps {
  eventId: string;
  eventSource: EventSource;
}

export const FavoriteButton = observer(
  ({eventId, eventSource}: FavoriteButtonProps) => {
    const isFavorited = favoriteStore.isFavorite(eventId, eventSource);

    const onPressFavorite = () => {
      favoriteStore.toggleFavorite(eventId, eventSource);
    };

    return (
      <TouchableOpacity
        className="self-start rounded-md bg-yellow-500 p-2"
        onPress={onPressFavorite}
        accessible
        accessibilityLabel="Toggle favorite event"
        accessibilityRole="button">
        <Text className="text-sm color-white">
          {isFavorited ? 'Unfavorite' : 'Favorite'}
        </Text>
      </TouchableOpacity>
    );
  },
);
