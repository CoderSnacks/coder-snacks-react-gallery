import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Image} from 'react-native';

export default function ImagePreview(props){
    console.log(props);
    return (
      <View style={{marginTop: 22}}>
        <View style={{margin:"auto"}} >
            <Image source={{uri:props.item.download_url}} style={{ width: 1200, height: 750}}/>
        </View>
        </View>
    );
  }