import { texts } from "_utils";
import { CheckboxItem } from '_atoms';
import { productsData } from '../../utils/mockData';
import {  FlatList, View } from 'react-native';
import Orientation from "react-native-orientation-locker";
import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    TitleText,
    VariantText,
    VariantItem,
    ProductFlatList,
    VariantsContainer,
    SelectedVariantsContainer,
} from './style';


const Home = () => {
    const [checkedItems, setCheckedItems] = useState({});
  
    useEffect(() => {
        // Lock the screen orientation to portrait
        Orientation.lockToPortrait();
        // Clean up by unlocking the orientation when component unmounts
        return () => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    // Reset checked items when data changes
    useEffect(() => {
        setCheckedItems({});
    }, [flattenedData]);

    // Function to flatten product data for rendering checkboxes
    const flattenData = (data) => {
        let result = [];
        data.forEach((category) => {
            result.push({
                label: category.category,
                children: category.brands.map((brand) => ({
                    label: brand.brand,
                    children: brand.models.map((model) => ({
                        label: model.model,
                        children: model.variants.map((variant) => ({ label: variant, parent: model.model })),
                    })),
                })),
            });
        });
        return result;
    };

    // Memoized flattened data
    const flattenedData = useMemo(() => flattenData(productsData), []);

    // Handler for checkbox change event
    const handleCheckboxChange = (id, parentModel) => {
        const uniqueId = parentModel ? `${parentModel}-${id}` : id;
        setCheckedItems((prevState) => ({
            ...prevState,
            [uniqueId]: !prevState[uniqueId]
        }));
    };

    // Render checkbox component recursively
    const renderCheckbox = (item, level = 1) => (
        <View key={item.label} style={{ marginLeft: 10 * level }}>
            <CheckboxItem
                itemKey={item.label}
                label={item.label}
                checked={checkedItems[item.label] || false}
                onCheckboxChange={() => handleCheckboxChange(item.label, item.parent)}
            />
            {item.children && item.children.length > 0 && (
                <FlatList
                    data={item.children}
                    renderItem={({ item }) => renderCheckbox(item, level + 1)}
                    keyExtractor={(item) => item.label}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={5}
                    initialNumToRender={5}
                />
            )}
        </View>
    );

    // Render selected variants
    const renderSelectedVariants = () => {
        const selectedVariants = Object.keys(checkedItems)
            .filter((key) => checkedItems[key])
            .reduce((acc, key) => {
                const [model, variant] = key.split('-');
                if(!acc[model]) {
                    acc[model] = [];
                }
                acc[model].push(variant);
                return acc;
            }, {});

        const formattedVariants = Object.entries(selectedVariants).map(
            ([model, variants]) => `${model} ${variants.join(', ')}`
        );

        return (
            <SelectedVariantsContainer>
                <FlatList
                    data={formattedVariants}
                    renderItem={({ item }) => (
                        <VariantItem>
                            <VariantText>{item}</VariantText>
                        </VariantItem>
                    )}
                    keyExtractor={(item) => item}
                    numColumns={2}
                    style={{ height: '30%', width: '100%' }}
                />
            </SelectedVariantsContainer>
        );
    };

    return (
        <Container>
            <TitleText>{texts.productTitle}</TitleText>
            <ProductFlatList
                data={flattenedData}
                renderItem={({ item }) => renderCheckbox(item)}
                keyExtractor={(item) => item.label}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                initialNumToRender={5}
            />
            <VariantsContainer>
                <TitleText>{texts.selectedVariants}</TitleText>
                {renderSelectedVariants()}
            </VariantsContainer>
        </Container>
    );
};

export default Home;
