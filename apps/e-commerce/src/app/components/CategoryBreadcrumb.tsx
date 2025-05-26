import { Breadcrumb } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryBreadcrumbProps {
  items: {
    title: string;
    path?: string;
  }[];
}

const CategoryBreadcrumb: React.FC<CategoryBreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumb 
      separator="/" 
      className="text-sm mb-6"
      items={items.map(item => ({
        title: item.path ? (
          <Link 
            to={item.path}
            className="text-[#4E4E4E] hover:text-[#595AFF]"
          >
            {item.title}
          </Link>
        ) : (
          <span className="text-[#595AFF] font-medium">
            {item.title}
          </span>
        ),
      }))}
    />
  );
};

export default CategoryBreadcrumb;
