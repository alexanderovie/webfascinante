import { IBlogPost } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import FeaturedBlogSwiper from './FeaturedBlogSwiper';

const FeaturedBlog = () => {
  // Fetch featured blogs from markdown files (server-side)
  const allBlogs: IBlogPost[] = getMarkDownData('src/data/blogs');
  const featuredBlogs: IBlogPost[] = allBlogs.filter((blog) => blog.featured === true).slice(0, 3);

  return (
    <section className="pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
      <div className="main-container">
        <div className="space-y-10 md:space-y-[70px]">
          <FeaturedBlogSwiper featuredBlogs={featuredBlogs} />
        </div>
      </div>
    </section>
  );
};

FeaturedBlog.displayName = 'FeaturedBlog';
export default FeaturedBlog;
