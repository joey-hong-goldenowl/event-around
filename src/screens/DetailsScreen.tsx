import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

import {RootStackParamList} from '../types/navigation';
import {eventStore} from '../stores/eventStore';
import {EventSource} from '../types/event';
import {formatPrice} from '../utils/number';
import {formatDateTime} from '../utils/date';
import {DynamicHeightImage} from '../components/DynamicHeightImage';

const DetailsScreen = observer(() => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();

  useEffect(() => {
    const eventId = route.params.id ?? null;
    const eventSource = route.params.source ?? null;
    if (eventId && eventSource) {
      eventStore.getSelectedEvent(eventId, eventSource);
    }

    return () => {
      eventStore.clearSelectedEvent();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPriceSection = () => {
    switch (eventStore.selectedEvent!.source) {
      case EventSource.YELP:
        return (
          <View className="mt-1 flex-row">
            <Text className="text-md flex-1">Estimated cost:</Text>
            <Text className="text-md flex-1 text-right font-semibold">{` ${eventStore.selectedEvent!.estimatedCost}`}</Text>
          </View>
        );
      case EventSource.FOURSQUARE:
        return (
          <View className="mt-1 flex-row">
            <Text className="text-md flex-1">Price:</Text>
            <Text className="text-md flex-1 text-right font-semibold">{` $${formatPrice(eventStore.selectedEvent!.price)}`}</Text>
          </View>
        );
      case EventSource.TICKETMASTER:
        return (
          <View className="mt-1 flex-row gap-1">
            <Text className="text-md flex-1">Price ranges:</Text>
            <View className="flex-1">
              {eventStore.selectedEvent!.priceRanges.map((range, i) => (
                <Text
                  key={i}
                  className="text-md text-right font-semibold">{`$${formatPrice(range.min)} - $${formatPrice(range.max)}`}</Text>
              ))}
            </View>
          </View>
        );
      default:
        return <View />;
    }
  };

  if (eventStore.selectedEventError) {
    return (
      <Text className="text-md mt-2 text-center font-semibold color-red-500">
        {eventStore.selectedEventError}
      </Text>
    );
  }

  if (!eventStore.selectedEvent) {
    return <ActivityIndicator className="my-2" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="p-4">
        <View className="mb-4 mt-2 gap-2">
          <Text className="text-center text-2xl font-bold">
            {eventStore.selectedEvent!.name}
          </Text>
          {!!eventStore.selectedEvent!.category && (
            <Text className="self-center rounded-xl bg-slate-200 px-1.5 py-1 text-xs font-normal color-gray-500">
              {eventStore.selectedEvent!.category}
            </Text>
          )}
        </View>
        <DynamicHeightImage uri={eventStore.selectedEvent!.image} />
        <View className="mt-4 flex-row">
          <Text className="text-md flex-1">Start date:</Text>
          <Text className="text-md flex-1 text-right font-semibold">{` ${formatDateTime(eventStore.selectedEvent!.startTime)}`}</Text>
        </View>
        {!!eventStore.selectedEvent!.endTime && (
          <View className="mt-1 flex-row">
            <Text className="text-md flex-1">End date:</Text>
            <Text className="text-md flex-1 text-right font-semibold">{` ${formatDateTime(eventStore.selectedEvent!.endTime)}`}</Text>
          </View>
        )}
        <View className="mt-1 flex-row">
          <Text className="text-md flex-1">Location:</Text>
          <Text className="text-md flex-1 text-right font-semibold">{` ${eventStore.selectedEvent!.location}`}</Text>
        </View>
        {renderPriceSection()}

        <View className="mt-1 flex-row">
          <Text className="text-md flex-1">Description:</Text>
          <Text className="text-md flex-1 text-right font-semibold">
            {eventStore.selectedEvent!.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default DetailsScreen;
