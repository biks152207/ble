import React, { Component } from 'react';
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight
} from 'react-native';

export function AlertInfo(message) {
  Alert.alert('Info', message);
}
