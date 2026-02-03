export const blogPosts = [
  {
    id: 1,
    title: 'The Future of Online Language Learning',
    excerpt: 'Explore how technology is revolutionizing the way we learn languages and what the future holds for online education.',
    category: 'Education',
    author: 'Sarah Johnson',
    date: 'January 15, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    imageAlt: 'Person studying online with laptop and books',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    title: '10 Tips for Effective Language Learning',
    excerpt: 'Discover proven strategies that will help you master a new language faster and retain what you learn.',
    category: 'Tips',
    author: 'Michael Chen',
    date: 'January 20, 2026',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    imageAlt: 'Notebook with study notes and coffee',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    title: 'How to Stay Motivated While Learning',
    excerpt: 'Learn practical techniques to maintain your enthusiasm and commitment throughout your language learning journey.',
    category: 'Motivation',
    author: 'Emma Rodriguez',
    date: 'January 22, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    imageAlt: 'Person celebrating success',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 4,
    title: 'The Science Behind Language Acquisition',
    excerpt: 'Understanding how our brains process and learn new languages can help you optimize your study methods.',
    category: 'Science',
    author: 'Dr. James Williams',
    date: 'January 24, 2026',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    imageAlt: 'Brain and neuroscience concept',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: 5,
    title: 'Building a Daily Language Learning Routine',
    excerpt: 'Create a sustainable daily practice that fits your schedule and accelerates your progress.',
    category: 'Tips',
    author: 'Lisa Thompson',
    date: 'January 25, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',
    imageAlt: 'Daily planner and schedule',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 6,
    title: 'Common Mistakes Language Learners Make',
    excerpt: 'Avoid these pitfalls and save time by learning from the experiences of others.',
    category: 'Tips',
    author: 'Carlos Martinez',
    date: 'January 26, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    imageAlt: 'Warning sign and caution concept',
    gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)'
  },
  {
    id: 7,
    title: 'Success Stories: From Beginner to Fluent',
    excerpt: 'Inspiring stories from our students who achieved fluency and how they did it.',
    category: 'Success Stories',
    author: 'Anna Kowalski',
    date: 'January 27, 2026',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    imageAlt: 'Graduation and success celebration',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 8,
    title: 'The Role of Culture in Language Learning',
    excerpt: 'Why understanding culture is just as important as mastering grammar and vocabulary.',
    category: 'Culture',
    author: 'Yuki Tanaka',
    date: 'January 27, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1526724038726-3007ffb8025f?w=800&q=80',
    imageAlt: 'World map and cultural diversity',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  }
];

export const categories = ['all', 'Education', 'Tips', 'Motivation', 'Science', 'Success Stories', 'Culture'];

export const getPostById = (id) => {
  return blogPosts.find(post => post.id === parseInt(id));
};

export const getRelatedPosts = (currentPostId, count = 3) => {
  return blogPosts
    .filter(post => post.id !== parseInt(currentPostId))
    .slice(0, count);
};
