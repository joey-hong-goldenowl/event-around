import {
  ActivityIndicator,
  SectionList,
  SectionListRenderItem,
  Text,
  View,
} from 'react-native';
import {observer} from 'mobx-react-lite';

import {EventItem} from '../EventItem';

import {Event} from '../../types/event';
import {eventStore} from '../../stores/eventStore';

import {EventListProps, EventListSection} from './type';

export const EventList = observer(({onViewEventDetails}: EventListProps) => {
  const renderItem: SectionListRenderItem<Event, EventListSection> = ({
    item,
  }) => <EventItem data={item} onViewDetails={onViewEventDetails} />;

  const renderHeader = () => (
    <Text className="mb-2 text-xl font-bold color-gray-950">
      What's happening around?
    </Text>
  );

  const renderSeparator = () => <View className="h-4" />;

  const renderEmpty = () => (
    <Text className="text-md text-center color-gray-500">No events found</Text>
  );

  const renderSectionHeader = ({
    section: {category},
  }: {
    section: EventListSection;
  }) => (
    <Text className="my-2 text-lg font-bold color-gray-600">{category}</Text>
  );

  if (eventStore.loading) {
    return <ActivityIndicator className="my-2" />;
  }

  if (eventStore.error) {
    return (
      <Text className="text-md mt-2 text-center font-semibold color-red-500">
        {eventStore.error}
      </Text>
    );
  }

  return (
    <SectionList
      sections={
        Object.entries(eventStore.eventsByCategory).map(
          ([category, events]) => ({
            category,
            data: events,
          }),
        ) as EventListSection[]
      }
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={renderSeparator}
      renderSectionHeader={renderSectionHeader}
      ListHeaderComponent={renderHeader}
      stickySectionHeadersEnabled={false}
      contentContainerClassName="p-4 bg-white"
    />
  );
});
