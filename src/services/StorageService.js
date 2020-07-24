import * as firebase from 'firebase';

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY || '';
const app = firebase.initializeApp({
  apiKey,
  storageBucket: 'gs://cleverod-test.appspot.com',
});

const storageRef = app.storage().ref();

export default class PostService {
  static async loadImage(image) {
    const imageName = `image-${Date.now()}-${image.name}`;
    const mountainImagesRef = storageRef.child(imageName);
    const imageInfo = await mountainImagesRef.put(image);
    return imageInfo.metadata.fullPath;
  }

  static async removeImage(imagePath) {
    storageRef.child(imagePath).delete();
  }

  static async replaceImage(oldImagePath, newImageFile) {
    if (oldImagePath) {
      this.removeImage(oldImagePath);
    }
    return await this.loadImage(newImageFile);
  }

  static async getImage(src) {
    try {
      return await storageRef.child(src).getDownloadURL();
    } catch (e) {
      return src;
    }
  }
}
