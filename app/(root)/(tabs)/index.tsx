import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="bg-white h-full">
      <Button title="Seed" onPress={seed} />
      {/* ―――――――――――――――――――――――――――――――――――――
          FlatList principal : grille de Card (2 colonnes)
          ――――――――――――――――――――――――――――――――――――― */}
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        /* ―――――――――――――――――――――――――――――――――――――
            ListHeaderComponent : contenu défilable au-dessus des Cards
            ――――――――――――――――――――――――――――――――――――― */
        ListHeaderComponent={
          <View className="px-5">
            {/* Bloc Avatar / Greetings */}
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={user?.avatar ? { uri: user.avatar } : images.avatar}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name || "User"}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            {/* Bloc Search */}
            <Search />

            {/* ―――――――――――――――――――――――――――――
                Section “Featured”
                ――――――――――――――――――――――――――――― */}
            <View className="my-5">
              {/* Titre + bouton “See All” */}
              <View className="flex flex-row items-center justify-between my-5">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Liste horizontale de FeaturedCard */}
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item }) => <FeaturedCard />}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>

            {/* ―――――――――――――――――――――――――――――
                Section “Our recommendations”
                ――――――――――――――――――――――――――――― */}
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our recommendations
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bloc Filters */}
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
