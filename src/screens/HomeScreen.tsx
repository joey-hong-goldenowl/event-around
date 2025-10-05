import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {EventList} from '../components/EventList';
import {eventStore} from '../stores/eventStore';

const HomeScreen = () => {
  const onViewEventDetails = () => {
    //
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
