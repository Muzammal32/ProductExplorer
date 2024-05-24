import { Dimensions, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '_utils';
const { width: screenWidth } = Dimensions.get('window');
export const Container = styled.View`
    flex: 1;
    padding: 10px;
`;

export const TitleText = styled.Text`
    font-size: 24px;
`;

export const ProductFlatList = styled(FlatList)`
    flex: 0.7;
    background: ${colors.gray};
`;

export const SelectedVariantsContainer = styled.View`
    flex: 1;
    padding: 10px;
`;

export const VariantItem = styled.View`
    width: ${screenWidth / 2 - 25}px;
    padding: 5px;
    margin: 5px;
    background: ${colors.gray};
`;

export const VariantText = styled.Text`
    flex-wrap: wrap;
`;

export const VariantsContainer = styled.View`
    flex: 0.3;
    margin-top: 10px;
`;
