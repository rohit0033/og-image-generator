import React from 'react';

interface OGImageProps {
  imageUrl: string;
}

const OGImage: React.FC<OGImageProps> = ({ imageUrl }) => {
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Generated OG Image:</h3>
      <img src={imageUrl} alt="OG Image" className="max-w-full h-auto mx-auto" />
    </div>
  );
};

export default OGImage;