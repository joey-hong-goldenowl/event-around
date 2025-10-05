import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {EventList} from '../components/EventList';

const HomeScreen = () => {
  const onViewEventDetails = () => {
    //
  };

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
