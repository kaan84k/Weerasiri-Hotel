const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'pork-fried-rice.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'egg-fried-rice.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'chicken-fried-rice.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'beef-fried-rice.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'seafood-rice.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'egg-kottu.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'chicken-kottu.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'beef-kottu.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'pork-kottu.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    filename: 'cheese-kottu.jpg'
  }
];

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download each image
images.forEach(image => {
  const file = fs.createWriteStream(path.join(imagesDir, image.filename));
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  };

  https.get(image.url, options, response => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${image.filename}`);
      });
    } else {
      console.error(`Failed to download ${image.filename}: ${response.statusCode}`);
      fs.unlink(path.join(imagesDir, image.filename), () => {});
    }
  }).on('error', err => {
    fs.unlink(path.join(imagesDir, image.filename), () => {});
    console.error(`Error downloading ${image.filename}:`, err.message);
  });
}); 