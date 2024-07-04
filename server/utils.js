// Helper function to save a base64 image
import fs from 'fs'

export const saveBase64Image = (base64Image, filePath) => {
    return new Promise((resolve, reject) => {
      const base64Data = base64Image.split(';base64,').pop();
      fs.writeFile(filePath, base64Data, { encoding: 'base64' }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

export const imageToBase64 = (filePath)=> {
  // Read the file from the given filePath
  const imageBuffer = fs.readFileSync(filePath);
  // Convert the buffer to a Base64 string
  const base64Image = imageBuffer.toString('base64');
  // Return the Base64 string
  return base64Image;
}

export const toTitleCase = (str)=>{
  str=  str.split('_').join(' ')
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export const getMonthName = (dateString) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const date = new Date(dateString);
  return monthNames[date.getMonth()];
};

  
  