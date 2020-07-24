const sizeValidation = (photoB64, { max, min }) => new Promise((resolve, reject) => {
  const iamge = new Image();
  iamge.src = photoB64;
  iamge.onload = () => {
    if (
      !iamge.width
      || !iamge.width
      || iamge.width > max
      || iamge.width < min
      || iamge.height > max
      || iamge.height < min
    ) {
      reject();
    } else {
      resolve();
    }
  };
});

const validTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export default (event) => new Promise((resolve, reject) => {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    const { type } = event.target.files[0];

    if (validTypes.some((validType) => validType === type)) {
      reader.readAsDataURL(event.target.files[0]);
      const photoFile = event.target.files[0];

      reader.onload = async (e) => {
        const photoB64 = e.target.result;
        try {
          await sizeValidation(photoB64, { min: 200, max: 4000 });
          resolve([photoFile, photoB64]);
        } catch (error) {
          reject(new Error('size error: width and hight must be between 200px and 4000px'));
        }
      };
    } else {
      reject(new Error(`invalid file type: allowed types ${validTypes.join(',')}`));
    }
  } else {
    reject(new Error('error'));
  }
});
