import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import tw from "twrnc";
import Button from "../../components/button";
import { getCandidates, getProfile } from "../../services/auth";

const Onboard = ({ navigation }) => {
  const [name, setName] = useState("");
  const [candidates, setCandidates] = useState([]);

  const getUserProfile = async () => {
    const profile = await getProfile();
    if (!profile?.data) return navigation.navigate("Login");
    setName(profile?.data?.names);

    const candidates = await getCandidates();
    setCandidates(candidates?.data?.docs);
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  const handleLogout = () => {
    SecureStore.deleteItemAsync("token");
    navigation.navigate("Login");
  };

  return (
    <View style={tw`h-full flex justify-around items-center`}>
      <View>
        <Text style={tw`font-bold text-xl`}>Welcome Onboard</Text>
        <Text style={tw`font-bold text-xl text-center`}>{name}</Text>

        <View style={tw`flex`}>
          <Text>Test</Text> <Text>Test</Text>
        </View>

        <View style={tw`mt-8`}>
          <Pressable onPress={handleLogout}>
            <Button style={tw`bg-black text-white w-full rounded-[10px]`}>
              LOGOUT
            </Button>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("AddCandidate");
            }}
          >
            <Button style={tw`bg-black text-white w-full rounded-[10px]`}>
              Create Candidate
            </Button>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Onboard;
