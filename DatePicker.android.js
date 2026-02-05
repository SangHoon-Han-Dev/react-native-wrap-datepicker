'use strict';

import { Component } from 'react'
import {
    DatePickerAndroid,
} from 'react-native'


export default class DatePicker extends Component {
    open(options) {
        return DatePickerAndroid.open(options)
    }

    render() {
        return null
    }
}
