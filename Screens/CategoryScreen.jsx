import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryScreen = ({ route }) => {
  const [categoryName, setCategoryName] = useState(
    route.params.category.strCategory
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    );
    const data = await res.json();
    // console.log(data);
    setData(data.meals);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        console.log(item.strMeal);
      }}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.text}>{item.strMeal}</Text>
    </Pressable>
  );

  //   console.log(categoryName);
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{categoryName}</Text>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <View style={styles.list}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            style={styles.flatList}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    fontWeight: "bold",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  item: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 5,
  },
  image: {
    height: 200,
  },
  text: {
    padding: 8,
    backgroundColor: "#EEAF0E",
    textAlign: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  list: {
    marginBottom: 100,
    paddingTop: 0,
  },
  loading: {
    textAlign: "center",
    marginTop: 64,
    fontSize: 18,
    fontWeight: "400",
  },
  flatList: {
    marginBottom: 80,
    padding: 16,
  },
});
