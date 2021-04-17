import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { Image } from 'react-native';
import ImagePreview from './ImagePreview';
import {Overlay} from 'react-native-elements'
import Modal from 'modal-react-native-web';

export default function App() {
  const [images, updateImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, updateSelectedImage] = useState([]);
  useEffect(()=>{
    try{
      fetch("https://picsum.photos/v2/list", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((response)=>{
        return response.json()
      }).then((data)=>{
        updateImages(data);
      })
      .catch((error)=>{
        console.log(error);
      })
    }catch(e){
      console.log(e);
    }
  },[images,updateImages])

  const renderItem = ({item,index}) =>{
    return <View  style={styles.galleryImage} >
        <Image onClick={()=>{setModalVisible(true); updateSelectedImage(item)}}  source={{uri:item.download_url}} key={index}  style={{ width: 450, height: 450 }}/>
      </View>
  }

  return (
    <>
      <View style={{margin:"auto"}}><Text style={styles.title}>CoderSnack's Image Gallery</Text></View>
      <Overlay ModalComponent={Modal} onBackdropPress={()=>setModalVisible(!modalVisible)} isVisible={modalVisible} children={<ImagePreview item={selectedImage}/>}/>
      <SafeAreaView style={styles.container}>
        <FlatList numColumns={3} data={images} renderItem={renderItem} keyExtractor={item => item.id} />
      </SafeAreaView>
      <View style={{margin:"auto"}}>
        <Text>Controls</Text>
      </View>
      
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:28,
    padding:15,
  },
  galleryImage:{
    margin:5,
  },
});
