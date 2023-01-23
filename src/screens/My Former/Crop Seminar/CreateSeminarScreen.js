import { View, StyleSheet,  Pressable,  FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MYinputs from '../../../components/MYinputs';
import mstyle from '../../../mstyle';
import Buttons from '../../../components/Buttons';


const CreateSeminarScreen = () => {
  const [villages, setvillages] = useState(["Option 01", "Option 02", "Option 03", "Option 04"])
  const [formdata, setformdata] = useState([
    { label: 'Select Village', value: [], type: 'select', key: 'village', options:villages },

    { label: 'Date', value: '2023-01-02', type: 'date', key: 'date'  },
    { label: 'Time', value: '10:00', type: 'time', key: 'time' },
    { label: 'Select The Venue', value: '', type: 'select', key: 'venue', options:villages },

    { label: 'Automated Message', placeholder:'', key: 'message', value:'',type: 'textarea', },

    { label: 'Nearest BK Center Village', value: '', type: 'select', key: 'center', options:villages },

     { label: 'My Image', value: [], type: 'image', key: 'image', },

     { label: 'Speeker Didi Name',placeholder:'Enter name', value: '',  key: 'name' },
     { label: 'Speeker Didi Mobile', placeholder: 'Enter mobile number',value:'',  key: 'number' },


    ])
  // if (item) {
  //   console.log(item)

  //   for (let i in formdata) {
  //     for (let n in item.item) {
  //       console.log('item value', item.item[n])
  //       if (formdata[i].key === n) {
  //         formdata[i].value = item.item[n]
  //       }
  //     }
  //   }
  // }


  const submit =()=>{
    console.log(formdata)
  }

  const update =()=>{
    console.log(formdata)
  }



  return (
    <View style={mstyle.container}>
      <ScrollView>
        <View>
        <FlatList
        data={formdata}
        renderItem={({ item, index }) => {
          return (
            <View>
              <MYinputs item={item} />
            </View>
          )
        }}

        ListFooterComponent={()=>{
          return(
            <Pressable style={{margin:10}}>
            <Buttons title={'Submit'} onPress={()=>{submit()}} loading={false}/>
          </Pressable>
          )
        }}
        
        />
        </View>
      </ScrollView>

    </View>
  )
}


const styles = StyleSheet.create({
  InputStyle: {
    padding: 20, shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 2,
  },

  inputbox: {
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  images: {
    width: 100,
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
})
export default CreateSeminarScreen