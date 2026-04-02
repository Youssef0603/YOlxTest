/* global jest */

jest.mock('@react-native-async-storage/async-storage', () => ({
  clear: jest.fn(),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  getItem: jest.fn(() => Promise.resolve(null)),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiRemove: jest.fn(() => Promise.resolve()),
  multiSet: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-localize', () => ({
  findBestLanguageTag: () => ({
    isRTL: false,
    languageTag: 'en',
  }),
}));

jest.mock('react-native-restart', () => ({
  Restart: jest.fn(),
  restart: jest.fn(),
}));

jest.mock('@react-native-vector-icons/feather', () => {
  const React = require('react');

  return {
    Feather: ({ name, size, color }) =>
      React.createElement('Icon', { name, size, color }),
  };
});

jest.mock('@react-native-vector-icons/material-icons', () => {
  const React = require('react');

  return {
    MaterialIcons: ({ name, size, color }) =>
      React.createElement('Icon', { name, size, color }),
  };
});

global.fetch = jest.fn(async input => {
  const url = typeof input === 'string' ? input : input.url;

  if (url.includes('/api/categories')) {
    return {
      json: async () => [],
      ok: true,
    };
  }

  if (url.includes('/api/categoryFields')) {
    return {
      json: async () => ({}),
      ok: true,
    };
  }

  return {
    json: async () => ({
      responses: [
        {
          hits: {
            hits: [],
            total: {
              relation: 'eq',
              value: 0,
            },
          },
          status: 200,
        },
      ],
    }),
    ok: true,
  };
});
