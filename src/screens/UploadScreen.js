import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ImageBackground, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker'; // Import from Expo's package
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export default function Upload() {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedURI, setSelectedURI] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const BACKEND_ENDPOINT = 'https://b491-203-125-116-194.ngrok-free.app';
  const [isLoading, setIsLoading] = useState(false);

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
      });

      if (result.assets) {
        setSelectedAudio(result.assets[0]?.name || 'Unknown File'); // Display the selected file name
        // setSelectedURI(result.assets[0]?.uri)

        const localUri = `${FileSystem.documentDirectory}${result.assets[0]?.name}`;
        await FileSystem.copyAsync({
            from: result.assets[0]?.uri,
            to: localUri,
        });

      setSelectedURI(localUri);

      } else {
        // Handle other errors or cancellation
        console.log('Document picker error:', result);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const uploadAudio = async () => {
    // Check if an instrument is selected
    if (!selectedInstrument) {
      alert('Please select an instrument.');
      return;
    }

    // Check if an audio file is selected
    if (!selectedAudio) {
      alert('Please select an audio file.');
      return;
    }

    setIsLoading(true);

    // Create FormData and append selected audio file and instrument
    const formData = new FormData();
    formData.append('audio_file', {
        uri: selectedURI,
        type: 'audio/*',
        name: selectedAudio,
      });
    formData.append('instrument', selectedInstrument);

    // Send the selected audio file and instrument to the backend
    axios.post(`${BACKEND_ENDPOINT}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Upload response:', response.data);
      setUploadMessage('File uploaded successfully');
    })
    .catch((error) => {
        console.error('Error uploading audio:', error);
        setUploadMessage('File upload unsuccessful');
      })
    .finally(() => {
        setIsLoading(false);
    });
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Upload Music</Text>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => {
          pickAudio();
        }}
      >
        <Text style={styles.buttonText}>Select Audio</Text>
      </TouchableOpacity>
      {selectedAudio && (
        <Text style={styles.selectedAudio}>Selected Audio: {selectedAudio}</Text>
      )}
      <View style={styles.instrumentSelection}>
        <Text style={styles.instrumentLabel}>Instrument:</Text>
        <Picker
          selectedValue={selectedInstrument}
          onValueChange={(itemValue) => setSelectedInstrument(itemValue)}
          style={{ width: 150 }} // Adjust the width as needed
        >
          <Picker.Item label="Select" value="" enabled={false} />
          <Picker.Item label="Guzheng" value="Guzheng" />
          <Picker.Item label="Dizi" value="Chinese flute dizi" />
          <Picker.Item label="Tabla" value="Tabla" />
          <Picker.Item label="Sitar" value="Sitar" />
          <Picker.Item label="Kompang" value="Malay drums kompang" />
        </Picker>
      </View>
      {selectedInstrument && (
        <Text style={styles.selectedInstrumentText}>Selected Instrument: {selectedInstrument}</Text>
      )}
      {isLoading ? (
        <View style={{ marginTop: 20 }}>
        <ActivityIndicator size="large" color="#5D3FD3" />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            uploadAudio();
          }}
        >
    <Text style={styles.buttonText}>Resonate</Text>
  </TouchableOpacity>
  )}
      <View style={{ marginTop: 30 }}>
        <Text style={{ color: uploadMessage === 'File uploaded successfully' ? 'green' : 'red' }}>
          {uploadMessage}
        </Text>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: 20,
      borderRadius: 10,
      marginTop: 150,
      marginBottom: 150,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    selectedAudio: {
      fontSize: 16,
      marginTop: 20,
    },
    selectButton: {
      backgroundColor: '#5D3FD3',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      elevation: 2,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    instrumentSelection: {
      marginTop: 20,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#5D3FD3',
      borderRadius: 8,
      padding: 10,
    },
    selectedInstrumentText: {
      fontSize: 16,
      marginTop: 20,
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    picker: {
      width: 200,
      marginTop: 10,
      marginBottom: 20,
    },
  });