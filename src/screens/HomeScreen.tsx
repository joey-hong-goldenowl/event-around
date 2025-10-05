import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <EventList onViewEventDetails={onViewEventDetails} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default HomeScreen;
