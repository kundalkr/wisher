import Compressor from 'compressorjs';

const Imgcompressor = (fileurl, height, width) => {
  return new Promise((resolve, reject) => {
    if (!fileurl) {
      reject(new Error("No file provided"));
      return;
    }
    fetch(fileurl)
      .then(res => res.blob())
      .then(blob => {
        const imageFile = new File([blob], "image.jpg", { type: blob.type });
        new Compressor(imageFile, {
          quality: 0.5,
 
          maxHeight: height, maxWidth: width,
          // minHeight: height, minWidth: width,
          success(result) {
            const imgUrl = URL.createObjectURL(result);
            resolve(imgUrl);
          },
          error(err) {
            reject(err);
          },
        })
      })
  }
  );
}

export const Imgcompressorforall = (fileurl) => {
  return new Promise((resolve, reject) => {
    if (!fileurl) {
      reject(new Error("No file provided"));
      return;
    }

    new Compressor(fileurl, {
      quality: 0.5,
      width: 1080,
      height: 1920,

      success(result) {
        const imgUrl = URL.createObjectURL(result);
        resolve(imgUrl);
      },
      error(err) {
        reject(err);
      },
    })
  })
}


export default Imgcompressor