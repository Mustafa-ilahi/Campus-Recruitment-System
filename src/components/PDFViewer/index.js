import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';
// import {Content} from 'native-base'
export default function PDFViewer({route}) {
  console.log(route.params.fileData);
  return (
    <Pdf
      source={{uri: route.params.fileData}}
      style={{
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
    />
  );
}
