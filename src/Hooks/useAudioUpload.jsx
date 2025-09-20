import { useState } from 'react';
import RNFS from 'react-native-fs';  // Import react-native-fs
import API_URL from '../Constants/API_URL';


const BASE_URL = API_URL + '/api/v1/';

const useAudioUpload = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [responseAudioUrl, setResponseAudioUrl] = useState('');
  const [responseText, setResponseText] = useState('');
  const [error, setError] = useState(null);
  const uploadAudio = async (filePath) => {
    if (!filePath) {
      setError('No audio recorded');
      return;
    }
  
    setUploadStatus('Uploading');
  
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('audio', {
        uri: filePath, // Direct file path from useAudioRecorder
        name: 'recording.mp3',
        type: 'audio/mp3', // Ensure the correct MIME type
      });
  
      const response = await fetch(`${BASE_URL}talking-note/generate-response`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      const responseData = await response.json();
  
      if (response.status === 200 && responseData) {
        setUploadStatus('Uploaded');
        setResponseAudioUrl(responseData.audioUrl || '');
        setResponseText(responseData.text);
        setError(null);
        return responseData;
      } else {
        throw new Error('Upload failed or invalid response');
      }
    } catch (err) {
      console.error('Error in uploadAudio:', err);
      setError('Error uploading file: ' + (err.message || 'Unknown error'));
      setUploadStatus('Upload failed');
      throw err;
    }
  };
  
  return {
    uploadAudio,
    uploadStatus,
    responseAudioUrl,
    responseText,
    error,
  };
};

export default useAudioUpload;
