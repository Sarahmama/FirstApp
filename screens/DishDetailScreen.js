import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

export default function DishDetailScreen({ route, navigation }) {
  const { dish } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dish Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Dish Image */}
        <Image source={{ uri: dish.image }} style={styles.dishImage} />

        {/* Dish Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.dishName}>{dish.name}</Text>
          <Text style={styles.description}>{dish.description}</Text>

          {/* Price and Quantity */}
          <View style={styles.priceQuantityContainer}>
            <Text style={styles.price}>
              ${(dish.price * quantity).toFixed(2)}
            </Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
              >
                <Ionicons name="remove" size={20} color="#d53f8c" />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Ionicons name="add" size={20} color="#d53f8c" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              addToCart(dish, quantity);
              navigation.goBack();
            }}
          >
            <Ionicons name="cart" size={24} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#d53f8c",
    padding: 15,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: "white",
  },
  content: {
    flexGrow: 1,
  },
  dishImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 20,
  },
  dishName: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  price: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#d53f8c",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff5f7",
    borderRadius: 25,
    padding: 5,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#d53f8c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quantityText: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    color: "#d53f8c",
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: "#d53f8c",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#d53f8c",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 10,
  },
});
