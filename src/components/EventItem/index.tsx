import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';

import {formatDateTime} from '../../utils/date';

import {EventItemProps} from './type';

export const EventItem = ({data, onViewDetails}: EventItemProps) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const onPressViewDetails = () => {
    onViewDetails(data);
  };

  const onImageError = () => {
    setImageError(true);
  };

  return (
    <View className="gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-sm">
      <Text className="text-md font-bold">{`${data.name} (${data.source})`}</Text>
      <View className="flex-row gap-3">
        {!imageError && (
          <Image
            className="h-32 w-32 rounded-sm bg-slate-500"
            source={{uri: data.image}}
            onError={onImageError}
            resizeMode="cover"
          />
        )}
        <View className="flex-1 gap-2">
          <View className="flex-row items-center justify-between gap-2">
            {!!data.category && (
              <Text className="rounded-xl bg-slate-200 px-1.5 py-1 text-xs font-normal color-gray-500">
                {data.category}
              </Text>
            )}
            <Text className="flex-1 text-right text-xs">
              {formatDateTime(data.startTime)}
            </Text>
          </View>
          <Text className="text-sm italic" numberOfLines={2}>
            {data.location}
          </Text>
          <Text className="text-sm" numberOfLines={2}>
            {data.description}
          </Text>
          <TouchableOpacity
            className="self-start rounded-md bg-green-600 p-2"
            onPress={onPressViewDetails}>
            <Text className="text-sm color-white">View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
