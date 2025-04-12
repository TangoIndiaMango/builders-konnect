import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined, RightOutlined } from '@ant-design/icons';

const { Header } = Layout;

// Demo data - this would come from the backend in production
const categories = [
  {
    id: 1,
    name: 'Flooring & Wall Tiles',
    path: '/category/flooring-wall-tiles',
    subcategories: [
      { id: 1, name: 'Ceramic Tiles', path: '/category/ceramic-tiles' },
      { id: 2, name: 'Porcelain Tiles', path: '/category/porcelain-tiles' },
      { id: 3, name: 'Natural Stone', path: '/category/natural-stone' },
    ]
  },
  {
    id: 2,
    name: 'Plumbing & Sanitary',
    path: '/category/plumbing-sanitary',
    subcategories: [
      { id: 4, name: 'Bathroom Fixtures', path: '/category/bathroom-fixtures' },
      { id: 5, name: 'Kitchen Fixtures', path: '/category/kitchen-fixtures' },
      { id: 6, name: 'Pipes & Fittings', path: '/category/pipes-fittings' },
    ]
  },
  {
    id: 3,
    name: 'Building Materials',
    path: '/category/building-materials',
    subcategories: [
      { id: 7, name: 'Cement', path: '/category/cement' },
      { id: 8, name: 'Steel', path: '/category/steel' },
      { id: 9, name: 'Blocks', path: '/category/blocks' },
    ]
  },
  {
    id: 4,
    name: 'Doors & Windows',
    path: '/category/doors-windows',
    subcategories: [
      { id: 10, name: 'Interior Doors', path: '/category/interior-doors' },
      { id: 11, name: 'Exterior Doors', path: '/category/exterior-doors' },
      { id: 12, name: 'Windows', path: '/category/windows' },
    ]
  },
  {
    id: 5,
    name: 'Wood & Carpentry',
    path: '/category/wood-carpentry',
    subcategories: [
      { id: 13, name: 'Lumber', path: '/category/lumber' },
      { id: 14, name: 'Plywood', path: '/category/plywood' },
      { id: 15, name: 'Furniture Wood', path: '/category/furniture-wood' },
    ]
  },
  {
    id: 6,
    name: 'Tools & Equipment',
    path: '/category/tools-equipment',
    subcategories: [
      { id: 16, name: 'Power Tools', path: '/category/power-tools' },
      { id: 17, name: 'Hand Tools', path: '/category/hand-tools' },
      { id: 18, name: 'Safety Equipment', path: '/category/safety-equipment' },
    ]
  },
  {
    id: 7,
    name: 'Painting & Decoration',
    path: '/category/painting-decoration',
    subcategories: [
      { id: 19, name: 'Paints', path: '/category/paints' },
      { id: 20, name: 'Wallpapers', path: '/category/wallpapers' },
      { id: 21, name: 'Decorative Items', path: '/category/decorative-items' },
    ]
  },
  {
    id: 8,
    name: 'Electrical & Lighting',
    path: '/category/electrical-lighting',
    subcategories: [
      { id: 22, name: 'Wiring', path: '/category/wiring' },
      { id: 23, name: 'Light Fixtures', path: '/category/light-fixtures' },
      { id: 24, name: 'Switches & Outlets', path: '/category/switches-outlets' },
    ]
  },
  {
    id: 9,
    name: 'Specials & Offers',
    path: '/specials',
    subcategories: [
      { id: 25, name: 'Clearance', path: '/specials/clearance' },
      { id: 26, name: 'New Arrivals', path: '/specials/new-arrivals' },
      { id: 27, name: 'Bundle Deals', path: '/specials/bundle-deals' },
    ]
  },
  {
    id: 10,
    name: 'Others',
    path: '/others',
    subcategories: [
      { id: 28, name: 'Miscellaneous', path: '/others/miscellaneous' },
      { id: 29, name: 'Accessories', path: '/others/accessories' },
      { id: 30, name: 'Custom Orders', path: '/others/custom-orders' },
    ]
  },
];

const MainLayoutHeader = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMobileCategory, setSelectedMobileCategory] = useState<number | null>(null);

  return (
    <Header className="bg-[#E6F7FF] border-b border-gray-200 px-0 h-auto" style={{color: 'rgba(0, 0, 0, 0.45)'}}>
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
        <nav className="relative hidden md:block">
          <ul className="flex items-center justify-between text-sm">
            {categories.map((category) => (
              <li
                key={category.id}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  to={category.path}
                  className="block px-4 py-3 text-gray-700 hover:text-[#003399] transition-colors"
                >
                  {category.name}
                </Link>

                {/* Desktop Dropdown */}
                {activeCategory === category.id && (
                  <div className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-b border-t border-gray-100 py-2 z-50">
                    {category.subcategories.map((subcategory) => (
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
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Drawer */}
        <Drawer
          placement="left"
          onClose={() => {
            setMobileMenuOpen(false);
            setSelectedMobileCategory(null);
          }}
          open={mobileMenuOpen}
          width="85%"
          title="Categories"
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex h-full">
            {/* Main Categories List */}
            <div className="w-full">
              {categories.map((category) => (
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
              ))}
            </div>

            {/* Subcategories Panel */}
            <Drawer
              placement="right"
              onClose={() => setSelectedMobileCategory(null)}
              open={selectedMobileCategory !== null}
              width="85%"
              title={categories.find(c => c.id === selectedMobileCategory)?.name}
              className="!absolute"
            >
              <div className="py-2">
                {selectedMobileCategory && categories
                  .find(c => c.id === selectedMobileCategory)
                  ?.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.path}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#003399]"
                      onClick={() => {
                        setSelectedMobileCategory(null);
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