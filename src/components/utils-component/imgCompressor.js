import Compressor from 'compressorjs';

const Imgcompressor = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }
    new Compressor(file, {
      quality: 0.5,
      width:1080,
      height:1920,
      success(result) {
        const imgUrl = URL.createObjectURL(result);
        resolve(imgUrl);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

export default Imgcompressor;