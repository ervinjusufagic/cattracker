import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { imageMap } from "../images";

const ImageCarousel = ({
  onSelectImage,
  selectedImage,
}: {
  onSelectImage: (image: string) => void;
  selectedImage: string;
}) => {
  return (
    <ScrollView horizontal>
      <View style={styles.scrollViewContent}>
        {Object.keys(imageMap).map((key, i) => (
          <TouchableOpacity
            onPress={() => {
              onSelectImage(key);
            }}
            key={i}>
            <Image
              resizeMode="contain"
              style={[
                styles.image,
                selectedImage === key && styles.selectedImage,
              ]}
              source={imageMap[key]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },

  selectedImage: {
    borderColor: "#007AFF",
    borderWidth: 1,
  },
});

export { ImageCarousel };
