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
import {AutoHeightImage} from '../components/AutoHeightImage';

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
          <Text className="text-md mt-1">
            Estimated cost:
            <Text className="text-md font-semibold">{` ${eventStore.selectedEvent!.estimatedCost}`}</Text>
          </Text>
        );
      case EventSource.FOURSQUARE:
        return (
          <Text className="text-md mt-1">
            Price:
            <Text className="text-md font-semibold">{` $${formatPrice(eventStore.selectedEvent!.price)}`}</Text>
          </Text>
        );
      case EventSource.TICKETMASTER:
        return (
          <View className="mt-1 gap-1">
            <Text className="text-md">Price ranges:</Text>
            {eventStore.selectedEvent!.priceRanges.map((range, i) => (
              <View key={i}>
                <Text className="text-md font-semibold">{`$${formatPrice(range.min)} - $${formatPrice(range.max)}`}</Text>
              </View>
            ))}
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
        <AutoHeightImage uri={eventStore.selectedEvent!.image} />
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
        <Text className="text-md mt-1">
          Start date:
          <Text className="text-md font-semibold">{` ${formatDateTime(eventStore.selectedEvent!.startTime)}`}</Text>
        </Text>
        {!!eventStore.selectedEvent!.endTime && (
          <Text className="text-md mt-1">
            End date:
            <Text className="text-md font-semibold">{` ${formatDateTime(eventStore.selectedEvent!.endTime)}`}</Text>
          </Text>
        )}
        <Text className=" text-md mt-1">
          Location:
          <Text className="text-md font-semibold">{` ${eventStore.selectedEvent!.location}`}</Text>
        </Text>
        {renderPriceSection()}

        <Text className="text-md mt-4">Description:</Text>
        <Text className="mt-1 text-lg">
          {eventStore.selectedEvent!.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
});

export default DetailsScreen;
