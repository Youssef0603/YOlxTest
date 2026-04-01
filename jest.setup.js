/* global jest */

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
