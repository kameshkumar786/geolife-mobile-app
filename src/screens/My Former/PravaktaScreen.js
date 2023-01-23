import { View, Text, FlatList, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Card from '../../components/Card'
import FabButton from '../../components/FabButton'
import mstyle from '../../mstyle'
import { Colors } from '../../contants'

const PravaktaScreen = ({ navigation }) => {

  const [data, setdata] = useState([
    { title: 'Farmer Name', subtitle: '9685062116', },
    { title: 'Farmer Name1', subtitle: '9685062115', }])

  const searchFilterFunction = (text) => {
    console.log(text)
    const res = data.filter(obj => Object.values(obj).some(val => val.includes(text)));
    console.log(res)
    if(res.length >=0){
      setdata(res)

    }
  }

  return (
    <View style={mstyle.container1}>
      
      <View style={mstyle.inputContainer}>
        <View style={mstyle.inputSubContainer}>

          <TextInput
            placeholder={'Type something'}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={mstyle.inputText}
            onChangeText={text => {
              searchFilterFunction(text)
            }}
          />
        </View>
      </View>


      <FlatList
        data={data}
        renderItem={(item) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate(item.item.route)
              }}
            >
              <Card item={item} />

            </Pressable>
          )
        }} />
      {/* <Pressable onPress={() => { navigation.navigate('AddFarmer') }}>
        <FabButton />

      </Pressable> */}


    </View>
  )
}

export default PravaktaScreen