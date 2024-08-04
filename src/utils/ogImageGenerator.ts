interface PostData {
    title: string;
    content: string;
    image?: string;
  }
  
  export const generateOGImage = async (post: PostData): Promise<string> => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
  
    // Set background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw title
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#1f2937';
    wrapText(ctx, post.title, 60, 80, 1080, 60);
  
    // Draw content snippet
    ctx.font = '24px Arial';
    ctx.fillStyle = '#4b5563';
    wrapText(ctx, post.content.slice(0, 100) + '...', 60, 200, 1080, 30);
  
    // Draw image if provided
    if (post.image) {
      try {
        const image = await loadImage(post.image);
        const aspectRatio = image.width / image.height;
        let drawWidth = 1080;
        let drawHeight = drawWidth / aspectRatio;
        let drawY = 280;
  
        if (drawHeight > 290) {
          drawHeight = 290;
          drawWidth = drawHeight * aspectRatio;
        }
  
        const drawX = (canvas.width - drawWidth) / 2;
        ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      } catch (error) {
        console.error('Failed to load image:', error);
      }
    }
  
    return canvas.toDataURL('image/png');
  };
  
  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
  
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }
  
  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  