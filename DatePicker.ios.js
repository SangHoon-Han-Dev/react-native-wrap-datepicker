'use strict';

import React, { Component } from 'react';
import {
    DatePickerIOS,
    Modal,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';

export default class DatePicker extends Component {
    state = {
        visible: false,
        date: null,
    };

    // 데코레이터 제거: 클래스 필드(화살표 함수)로 this 바인딩 보장
    open = (options) => {
        let date;
        if (options && options.date) date = options.date;
        if (!date) date = new Date();

        this.setState({ date, visible: true });

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    };

    close = () => {
        this.setState({ visible: false });
    };

    cancel = () => {
        if (this.resolve) {
            this.resolve({ action: 'dismissedAction' });
        }
        this.close();
    };

    ok = () => {
        const { date } = this.state;
        if (this.resolve) {
            this.resolve({
                action: 'dateSetAction',
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
            });
        }
        this.close();
    };

    onDateChange = (date) => {
        this.setState({ date });
    };

    getButton = () => {
        const { iosCloseButton } = this.props;
        if (iosCloseButton) return iosCloseButton;

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={this.cancel}
                    style={{ width: 85, height: 30, alignItems: 'center' }}
                >
                    <Text>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.ok}
                    style={{ width: 85, height: 50, alignItems: 'center' }}
                >
                    <Text>O K</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        const { visible, date } = this.state;
        const { style } = this.props;

        return (
            <Modal
                ref={(modal) => (this.modal = modal)}
                visible={visible}
                onRequestClose={this.close}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 100,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <View style={[{ backgroundColor: 'white' }, style]}>
                        {visible ? (
                            <DatePickerIOS
                                date={date}
                                mode="date"
                                onDateChange={this.onDateChange}
                            />
                        ) : null}

                        {visible ? this.getButton() : null}
                    </View>
                </View>
            </Modal>
        );
    }
}
