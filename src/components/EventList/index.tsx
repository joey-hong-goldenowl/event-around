import {FlatList, ListRenderItem, Text, View} from 'react-native';

import {EventItem} from '../EventItem';

import {Event, EventSource} from '../../types/event';

import {EventListProps} from './type';

const TEST_DATA = [
  {
    source: EventSource.YELP,
    id: '1',
    name: 'Test event',
    description:
      "Join us for the opening night of Melbourne's premier jazz festival featuring local and international artists.",
    location: '123 Collins Street, Melbourne VIC 3000',
    startTime: '2024-02-15T19:30:00+00:00',
    endTime: '2024-02-15T23:00:00+00:00',
    url: 'https://example.com/jazz-festival',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    category: 'Music',
  },
];

export const EventList = ({onViewEventDetails}: EventListProps) => {
  const renderItem: ListRenderItem<Event> = ({item}) => (
    <EventItem data={item} onViewDetails={onViewEventDetails} />
  );

  const renderHeader = () => (
    <Text className="mb-2 text-xl font-bold color-gray-950">
      What's happening around?
    </Text>
  );

  const renderSeparator = () => <View className="h-4" />;

  const renderEmpty = () => (
    <Text className="text-md text-center color-gray-500">No events found</Text>
  );

  return (
    <FlatList
      data={TEST_DATA}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      contentContainerClassName="p-4 bg-white"
    />
  );
};
