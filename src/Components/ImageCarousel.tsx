import React, { useLayoutEffect } from "react";
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
  let scrollViewRef: ScrollView | null = null;

  useLayoutEffect(() => {
    setTimeout(() => {
      scrollViewRef?.scrollTo({ x: calculateScroll(), animated: true });
    }, 1);
    // Need to delay for ios
  });

  const getSelectedImageIndex = () => {
    let imageIndex: number = 0;

    Object.keys(imageMap).map((key, i) => {
      if (key === selectedImage) {
        imageIndex = i;
      }
    });

    return imageIndex;
  };

  const calculateScroll = () => {
    const imageIndex = getSelectedImageIndex();

    const imageXPosition = 200 * imageIndex;
    const margin = imageIndex * 10;

    return imageXPosition + margin;
  };

  return (
    <ScrollView
      pagingEnabled={true}
      ref={ref => (scrollViewRef = ref)}
      horizontal>
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
