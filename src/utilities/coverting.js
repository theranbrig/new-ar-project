export const convertFile = (file, newFileName) => {
  const byteString = atob(file.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  const newBlob = new Blob([ab], {
    type: 'image/png',
  });

  function blobToFile(theBlob, fileName) {
    return new File([theBlob], 'my_file.png', {
      type: 'image/png',
      lastModified: Date.now(),
    });
  }
  const newFile = blobToFile(newBlob, newFileName);
  return newFile;
};
