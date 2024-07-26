const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  maxBlog = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
  return {
    title: maxBlog.title,
    author: maxBlog.author,
    likes: maxBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
