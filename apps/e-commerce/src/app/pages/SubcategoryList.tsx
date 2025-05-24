import { Link, useParams } from 'react-router-dom';
import { useGetCategorizations } from '../../hooks/useApis';
import CategoryBreadcrumb from '../components/CategoryBreadcrumb';

type SubCategory = {
  id: string;
  name: string;
  level: string;
  parent_id: string;
  path?: string;
};

const SubcategoryList = () => {
  const { category } = useParams();

  const { data: categoryData = [] } =
    useGetCategorizations('category', category) as { data: { id: string; name: string }[]; isLoading: boolean };

  const { data: subcategories = [], isLoading: isSubcategoriesLoading } =
    useGetCategorizations('subcategory', category) as { data: SubCategory[]; isLoading: boolean };

  const currentCategory = categoryData[0];

  return (
    <div className="min-h-screen bg-white p-8 md:p-20">
      <CategoryBreadcrumb
        items={[
          { title: 'Home', path: '/' },
          { title: currentCategory?.name || '' }
        ]}
      />

      {isSubcategoriesLoading ? (
        <div className="text-center py-8">Loading subcategories...</div>
      ) : subcategories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {subcategories.map((item) => (
            <Link 
              to={`/category/${category}/subcategory/${item.id}`} 
              key={item.id}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 group-hover:border-blue-500 transition-colors">
                <div className="p-4">
                  <h2 className="text-lg font-medium text-gray-800 group-hover:text-blue-600">
                    {item.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No subcategories found for this category
        </div>
      )}
    </div>
  );
};

export default SubcategoryList;
