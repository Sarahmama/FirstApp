import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import restaurantCategories from "../data/data";

export default function Category({ onSelectCategory, selectedCategory }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <TouchableOpacity
          style={[
            styles.categoryCard,
            !selectedCategory && styles.selectedCategory,
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/color/96/000000/restaurant-menu.png",
            }}
            style={styles.categoryImage}
            resizeMode="cover"
          />
          <View style={styles.nameContainer}>
            <Text style={styles.categoryName}>All</Text>
          </View>
        </TouchableOpacity>

        {restaurantCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              selectedCategory === category.categoryName &&
                styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(category.categoryName)}
          >
            <Image
              source={{ uri: category.categoryImage }}
              style={styles.categoryImage}
              resizeMode="cover"
            />
            <View style={styles.nameContainer}>
              <Text style={styles.categoryName}>{category.categoryName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff5f7",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
    color: "#d53f8c",
    letterSpacing: 0.5,
  },
  scrollView: {
    paddingRight: 15,
    paddingBottom: 10,
  },
  categoryCard: {
    marginLeft: 15,
    alignItems: "center",
    minWidth: 100,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 12,
    shadowColor: "#d53f8c",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#fed7e2",
  },
  nameContainer: {
    backgroundColor: "#fff5f7",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "100%",
  },
  categoryName: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#d53f8c",
    textAlign: "center",
  },
  selectedCategory: {
    backgroundColor: "#fed7e2",
    transform: [{ scale: 1.05 }],
  },
});
