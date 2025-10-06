import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {EventList} from '../components/EventList';
import {eventStore} from '../stores/eventStore';
import {RootStackParamList} from '../types/navigation';
import {Event} from '../types/event';

const HomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const onViewEventDetails = (event: Event) => {
    navigation.navigate('Details', {
      id: event.id,
      source: event.source,
    });
  };

  useEffect(() => {
    eventStore.fetchEvents();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <EventList onViewEventDetails={onViewEventDetails} />
    </SafeAreaView>
  );
};

export default HomeScreen;
