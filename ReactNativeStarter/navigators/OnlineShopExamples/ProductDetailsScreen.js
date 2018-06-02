import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

export default class ProductDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      loading: true,
    }

    const product = this.props.navigation.state.params.product;
    const id = product._id;

    fetch(`http://localhost:9000/onlineshop/products/${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ product: responseJson });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          (this.state.loading === false) &&
          <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: height / 3 }}>
              <Image resizeMode="cover" source={{ uri: 'https://picsum.photos/600/600' }} style={{ height: '100%', width: '100%' }} />
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ padding: 8 }}>
                <Text>{this.state.product.name}</Text>
              </View>
              <View style={{ padding: 8 }}>
                <Text>${this.state.product.price}</Text>
              </View>
            </View>
          </View>
        }
      </View>
    );
  }
}
