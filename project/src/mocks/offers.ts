import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: '1',
    src: 'img/room.jpg',
    price: 80,
    isFavorite: false,
    rating: 80,
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    description: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 20
      }
    },
    location: {
      latitude: 52.3747515,
      longitude: 4.8908885,
    }
  },
  {
    id: '2',
    src: 'img/apartment-01.jpg',
    price: 120,
    isFavorite: true,
    rating: 50,
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    description: 'Wood and stone place',
    type: 'Private room',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.369553943508,
        longitude: 4.85309666406198,
        zoom: 20
      }
    },
    isPremium: true,
    location: {
      latitude: 52.37624,
      longitude: 4.891647,
    }
  },
  {
    id: '3',
    src: 'img/apartment-02.jpg',
    price: 32,
    isFavorite: false,
    rating: 75,
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    description: 'Canal View Prinsengracht',
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 20
      }
    },
    location: {
      latitude: 52.3809543943508,
      longitude: 4.939304666406198,
    }
  },
  {
    id: '4',
    src: 'img/apartment-03.jpg',
    price: 180,
    isFavorite: true,
    rating: 100,
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    description: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 20
      }
    },
    isPremium: true,
    images: ['img/apartment-02.jpg', 'img/apartment-03.jpg', 'https://10.react.pages.academy/static/hotel/8.jpg'],
    bedrooms: 3,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Baby seat',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    host: {
      id: '11',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
      name: 'Angelina',
    },
    location: {
      latitude: 52.373463,
      longitude: 4.893452,
    }
  },
  {
    id: '5',
    src: 'img/apartment-03.jpg',
    price: 280,
    isFavorite: true,
    rating: 100,
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    description: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 20
      }
    },
    isPremium: true,
    images: ['img/apartment-02.jpg', 'https://10.react.pages.academy/static/hotel/8.jpg'],
    bedrooms: 3,
    maxAdults: 4,
    goods: [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    host: {
      id: '11',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
      name: 'Angelina',
    },
    location: {
      latitude: 52.373463,
      longitude: 4.893452,
    }
  },
];
