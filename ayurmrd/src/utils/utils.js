export function keepSpecificColor(base64Image, targetColor, replacementColor) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const targetRGB = hexToRgb(targetColor);
        const replacementRGB = hexToRgb(replacementColor);

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (!(r === targetRGB.r && g === targetRGB.g && b === targetRGB.b)) {
                data[i] = replacementRGB.r;
                data[i + 1] = replacementRGB.g;
                data[i + 2] = replacementRGB.b;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        const newBase64Image = canvas.toDataURL();
        console.log(newBase64Image); // You can use this base64 string as needed
        return newBase64Image
    };

    img.src = base64Image;
}


export function hexToRgb(hexStr) {
    var col = {};
    col.r = parseInt(hexStr.substr(1,2),16);
    col.g = parseInt(hexStr.substr(3,2),16);
    col.b = parseInt(hexStr.substr(5,2),16);
    return col;
}

export const isBase64Image = (str)=>{
    // Regular expression to check if the string starts with a valid data URL scheme for images
    const base64Pattern = /^data:image\/(jpeg|png|gif|bmp|webp);base64,/;
    
    // Test if the string matches the base64Pattern
    if (base64Pattern.test(str)) {
      // Extract the base64 part of the string (excluding the prefix)
      const base64String = str.replace(base64Pattern, '');
      
      // Regular expression to check if the rest of the string is valid Base64
      const base64ValidPattern = /^[A-Za-z0-9+/]+={0,2}$/;
      
      // Test if the remaining part of the string is valid Base64
      return base64ValidPattern.test(base64String);
    }
    return false;
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