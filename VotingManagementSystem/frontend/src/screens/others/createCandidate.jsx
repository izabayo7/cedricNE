import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons ,AntDesign } from "@expo/vector-icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import tw from "twrnc";

import Button from "../../components/button";
import { createCandidate } from "../../services/auth";
import Input from "../../components/input";

const CreateCandidate = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const initialValues = {
    names: "",
    missionStatement: "",
    gender: "",
    profilePicture: "",
    nationalId: ""
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    missionStatement: Yup.string().required("Mission statement is required"),
    gender: Yup.string().required("Gender is required"),
    nationalId: Yup.string().required("NationalId is required"),
    profilePicture: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    getFieldProps,
  } = formik;

  const handleSubmit = async () => {
    setLoading(true);
    setAuthError("");
    const res = await createCandidate(values);
    setLoading(false);
    if (!res?.success){
      let message = "Something went wrong";
      if(res?.message){
        message=res.message;
        if(message.includes("required pattern"))
        message= "invalid nationalId"
      }
      return setAuthError(message);
    }
    navigation.navigate("Home");
  };

  return (
    <View style={tw`h-[100%] bg-white  justify-end items-center`}>
      <SafeAreaView style={tw`h-[85%] w-full bg-white `}>
        <ScrollView>
          <View>
            <View style={tw`w-full`}>
              <Text style={tw`text-center font-extrabold text-xl`}>
                Candidate Registration
              </Text>
            </View>

            {authError.length > 0 && (
              <Text style={tw`mt-4 text-red-500 text-center`}>{authError}</Text>
            )}
            <View style={tw`mt-8`}>
              <View style={tw`px-6 py-2`}>
                <Input
                  Icon={
                    <MaterialIcons
                      name="person-outline"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="Full Name"
                  onChangeText={handleChange("names")}
                  onBlur={handleBlur("names")}
                  value={values.name}
                  borderColor={touched.name && errors.name ? "red" : "gray"}
                />
                {touched.name && errors.name && (
                  <Text style={tw`text-red-500`}>{errors.name}</Text>
                )}

                <Input
                  Icon={
                    <MaterialIcons
                      name="location-on"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="Mission Statement"
                  onChangeText={handleChange("missionStatement")}
                  onBlur={handleBlur("missionStatement")}
                  value={values.missionStatement}
                  borderColor={
                    touched.missionStatement && errors.missionStatement ? "red" : "gray"
                  }
                />
                {touched.missionStatement && errors.missionStatement && (
                  <Text style={tw`text-red-500`}>{errors.missionStatement}</Text>
                )}

                <Input
                  Icon={
                    <MaterialCommunityIcons
                      name="gender-male-female"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="Gender"
                  onChangeText={handleChange("gender")}
                  onBlur={handleBlur("gender")}
                  value={values.phone}
                  borderColor={touched.gender && errors.gender ? "red" : "gray"}
                />
                {touched.gender && errors.gender && (
                  <Text style={tw`text-red-500`}>{errors.gender}</Text>
                )}

                <Input
                  Icon={
                    <AntDesign
                      name="idcard"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="NationalId"
                  onChangeText={handleChange("nationalId")}
                  onBlur={handleBlur("nationalId")}
                  value={values.nationalId}
                  borderColor={
                    touched.nationalId && errors.nationalId ? "red" : "gray"
                  }
                />
                {touched.nationalId && errors.nationalId && (
                  <Text style={tw`text-red-500`}>{errors.nationalId}</Text>
                )}

                <Input
                  Icon={
                    <AntDesign
                      name="picture"
                      size={24}
                      color="silver"
                    />
                  }
                  placeholder="profilePicture url"
                  onChangeText={handleChange("profilePicture")}
                  onBlur={handleBlur("profilePicture")}
                  value={values.profilePicture}
                  borderColor={
                    touched.profilePicture && errors.profilePicture ? "red" : "gray"
                  }
                />
                {touched.profilePicture && errors.profilePicture && (
                  <Text style={tw`text-red-500`}>{errors.profilePicture}</Text>
                )}

                <View style={tw`mt-8`}>
                  <Button
                    mode={"contained"}
                    style={tw`bg-[#193074] w-full p-[10] mt-4`}
                    onPress={handleSubmit}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>

                  <Pressable onPress={() => navigation.navigate("Home")}>
                    <View style={tw`mt-4`}>
                      <Text style={tw`text-xl underline text-gray-500`}>
                        Back
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CreateCandidate;
