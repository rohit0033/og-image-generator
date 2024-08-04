import React, { useState, useEffect } from 'react';
import OGImage from './OGImage';
import { generateOGImage } from '../utils/ogImageGenerator';

interface PostData {
  title: string;
  content: string;
  image?: string;
}

const PostPage: React.FC = () => {
  const [post, setPost] = useState<PostData>({
    title: '',
    content: '',
    image: '',
  });
  const [ogImageUrl, setOgImageUrl] = useState<string>('');

  useEffect(() => {
    const generateImage = async () => {
      if (post.title && post.content) {
        try {
          const imageUrl = await generateOGImage(post);
          setOgImageUrl(imageUrl);
          updateMetaTags(imageUrl);
        } catch (error) {
          console.error('Failed to generate OG image:', error);
        }
      }
    };

    generateImage();
  }, [post]);

  const updateMetaTags = (imageUrl: string) => {
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', imageUrl);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      meta.setAttribute('content', imageUrl);
      document.head.appendChild(meta);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a Post</h1>
      <form className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Post Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleInputChange}
          placeholder="Post Content"
          className="w-full p-2 border rounded h-32"
        />
        <input
          type="text"
          name="image"
          value={post.image}
          onChange={handleInputChange}
          placeholder="Image URL (optional)"
          className="w-full p-2 border rounded"
        />
      </form>
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
        <p className="mb-4">{post.content}</p>
        {post.image && <img src={post.image} alt="Post" className="max-w-full h-auto" />}
      </div>
      {ogImageUrl && <OGImage imageUrl={ogImageUrl} />}
    </div>
  );
};

export default PostPage;