import { currentNavigationAtom } from '../../store/navigation';
import { Tabs } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useAtom } from 'jotai';

const mainNavigationTabs = [
  {
    key: 'pos',
    label: 'Point of Sale',
  },
  {
    key: 'accounting',
    label: 'Accounting',
  },
  {
    key: 'procurement',
    label: 'Procurement Management',
  },
];

const SubHeaderTabs = () => {
  const [activeTab, setActiveTab] = useAtom(currentNavigationAtom);

  return (
    <Header
      style={{
        background: '#003399',
        padding: '10px 0',
        height: 'auto',
        lineHeight: 'normal',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Tabs
        activeKey={activeTab}
        items={mainNavigationTabs}

        onChange={(key) => setActiveTab(key as 'pos' | 'accounting' | 'procurement')}
        style={{
          marginBottom: 0,
        }}
        tabBarStyle={{
          margin: 0,
          padding: '0 16px',
          background: '#003399',
        }}
        type="card"
        size="large"
        className="main-navigation-tabs"
      />
    </Header>
  );
};

export default SubHeaderTabs;
