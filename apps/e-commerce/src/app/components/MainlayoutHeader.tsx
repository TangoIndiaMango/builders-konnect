import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined, RightOutlined } from '@ant-design/icons';
import { useGetCategorizations } from '../../hooks/useApis';

const { Header } = Layout;

type CategoryBase = {
  id: string;
  name: string;
  level: string;
  parent_id?: string;
  path?: string;
};

type SubCategoryBase = {
  id: string;
  name: string;
  level: string;
  parent_id: string;
  path?: string;
};

const MainLayoutHeader = () => {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMobileCategory, setSelectedMobileCategory] = useState<string | undefined>(undefined);

  const { data: categoriesData = [], isLoading: isCategoriesLoading } = useGetCategorizations('category');
  const categories = (categoriesData || []) as CategoryBase[];

  // Get subcategories for desktop view
  const { data: desktopSubcategoriesData = [], isLoading: isDesktopSubcategoriesLoading } = useGetCategorizations('subcategory', activeCategory);
  const desktopSubcategories = (desktopSubcategoriesData || []) as SubCategoryBase[];

  // Get subcategories for mobile view
  const { data: mobileSubcategoriesData = [], isLoading: isMobileSubcategoriesLoading } = useGetCategorizations('subcategory', selectedMobileCategory);
  const mobileSubcategories = (mobileSubcategoriesData || []) as SubCategoryBase[];

  // Add paths to subcategories
  const desktopSubcategoriesWithPaths = desktopSubcategories.map(subcategory => ({
    ...subcategory,
    path: `/category/${activeCategory}/subcategory/${subcategory.id}`
  }));

  const mobileSubcategoriesWithPaths = mobileSubcategories.map(subcategory => ({
    ...subcategory,
    path: `/category/${activeCategory}/subcategory/${subcategory.id}`
  }));

  // Add default paths to categories and subcategories
  const categoriesWithPaths = categories.map(category => ({
    ...category,
    path: `/category/${category.id}`
  }));


  return (
    <Header className="!bg-[#E6F7FF] border-b border-gray-200 !px-0 !h-auto" style={{color: 'rgba(0, 0, 0, 0.45)'}}>
      <div className="container mx-auto">
        {/* Mobile Menu Button */}
        <div className="md:hidden px-4 py-2">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center"
          >
            <span className="ml-2">Categories</span>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="relative hidden md:block overflow-x-auto">
          <ul className="flex items-center text-sm whitespace-nowrap min-w-max px-4">
            {isCategoriesLoading ? (
              <li>Loading...</li>
            ) : (
              categoriesWithPaths?.map((category) => (
                <li
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(undefined)}
                  style={{ position: 'relative' }}
                >
                  <Link
                    to={category.path}
                    className="block px-4 py-3 !text-gray-700 !hover:text-[#003399] transition-colors"
                  >
                    {category.name}
                  </Link>

                  {/* Desktop Dropdown */}
                  {activeCategory === category.id && !isDesktopSubcategoriesLoading && desktopSubcategories.length > 0 && (
                    <div className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-b border-t border-gray-100 py-2 z-[50]">
                      {desktopSubcategoriesWithPaths.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={subcategory.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003399]"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </nav>

        {/* Mobile Menu Drawer */}
        <Drawer
          placement="left"
          onClose={() => {
            setMobileMenuOpen(false);
            setSelectedMobileCategory(undefined);
          }}
          open={mobileMenuOpen}
          width="85%"
          title="Categories"
          style={{ padding: 0 }}
        >
          <div className="flex h-full">
            {/* Main Categories List */}
            <div className="w-full">
              {isCategoriesLoading ? (
                <div>Loading...</div>
              ) : (
                categoriesWithPaths?.map((category) => (
                  <div
                    key={category.id}
                    className={`border-b border-gray-100 ${
                      selectedMobileCategory === category.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <button
                      onClick={() => setSelectedMobileCategory(category.id)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left text-gray-700 hover:text-[#003399]"
                    >
                      <span>{category.name}</span>
                      <RightOutlined className="text-xs opacity-50" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Subcategories Panel */}
            <Drawer
              placement="right"
              onClose={() => setSelectedMobileCategory(undefined)}
              open={!!selectedMobileCategory}
              width="85%"
              title={categories.find(c => c.id === selectedMobileCategory)?.name || 'Subcategories'}
              className="!absolute"
            >
              <div className="py-2">
                {selectedMobileCategory && !isMobileSubcategoriesLoading && mobileSubcategoriesWithPaths.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.path}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#003399]"
                      onClick={() => {
                        setSelectedMobileCategory(undefined);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
              </div>
            </Drawer>
          </div>
        </Drawer>
      </div>
    </Header>
  );
};

export default MainLayoutHeader;
