import React from 'react';
import { colors } from '_utils';
import PropTypes from 'prop-types';
import { Container, Label } from './style';
import CheckBox from '@react-native-community/checkbox';


const CheckboxItem = ({ itemKey, label, checked, onCheckboxChange }) => {
    return (
        <Container>
            <CheckBox
                boxType="square"
                value={checked}
                onValueChange={() => onCheckboxChange(itemKey)}
                style={{ height: 20, width: 20,backgroundColor: 'white' }} 
                tintColor={colors.darkGray} 
                onCheckColor={colors.darkGray} 
                onTintColor={colors.darkGray} 
            />
            <Label>{label}</Label>
        </Container>
    );
};

// PropTypes for CheckboxItem component to enforce type checking
CheckboxItem.propTypes = {
    itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
};


export default CheckboxItem;
