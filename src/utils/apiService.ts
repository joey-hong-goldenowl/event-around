import {
  Event,
  EventSource,
  FoursquareResponse,
  TicketmasterResponse,
  YelpResponse,
} from '../types/event';

export const yelpResponseMapper = (response: YelpResponse): Event[] => {
  const {events} = response;

  return events.map(event => ({
    id: event.id,
    name: event.name,
    description: event.description,
    location: event.location.display_address.join(', '),
    source: EventSource.YELP,
    startTime: event.time_start,
    endTime: event.time_end,
    url: event.event_site_url,
    image: event.image_url,
    category: event.category,
  }));
};

export const tickermasterResponseMapper = (
  response: TicketmasterResponse,
): Event[] => {
  const {events} = response._embedded;

  return events.map(event => {
    let location = '';
    if (event._embedded.venues.length > 0) {
      const venue = event._embedded.venues[0];
      location = `${venue.name}, ${venue.address.line1}, ${venue.city.name} ${venue.state.stateCode} ${venue.postalCode}`;
    }

    let category = '';
    if (event.classifications.length > 0) {
      category = event.classifications[0].segment.name;
    }

    return {
      id: event.id,
      name: event.name,
      description: event.info,
      location,
      source: EventSource.TICKETMASTER,
      startTime: event.dates.start.dateTime,
      endTime: event.dates.end?.dateTime ?? '',
      url: event.url,
      image: event.images?.[0]?.url ?? '',
      category,
    };
  });
};

export const foursquareResponseMapper = (
  response: FoursquareResponse,
): Event[] => {
  const {results} = response;

  return results.map(event => {
    let category = '';
    if (event.categories.length > 0) {
      category = event.categories[0].name;
    }

    let image = '';
    if (event.photos.length > 0) {
      image = `${event.photos[0].prefix}${event.photos[0].suffix.slice(1)}`;
    }

    return {
      id: event.fsq_id,
      name: event.name,
      description: event.description,
      location: event.location.formatted_address,
      source: EventSource.FOURSQUARE,
      startTime: event.event_date,
      endTime: event.event_end_date,
      url: event.venue_url,
      image,
      category,
    };
  });
};
