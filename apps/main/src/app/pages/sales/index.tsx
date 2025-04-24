import { useState } from 'react';
import { Button, Tabs, TabsProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PageIntroBanner from '../../components/common/PageIntroBanner';
import AllSales from '../../components/sales/AllSales';
import OnlineSales from '../../components/sales/OnlineSales';
import InstoreSales from '../../components/sales/InstoreSales';
import ConfirmModal from '../../components/common/ConfirmModal';

const SalesHome = () => {
  const [pauseSalesOpened, setPauseSalesOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const onChange = (key: string) => {
    console.log('Selected tab:', key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'all-sales',
      label: 'All Sales',
      children: <AllSales />,
    },
    {
      key: 'online-sales',
      label: 'Online Sales',
      children: <OnlineSales />,
    },
    {
      key: 'instore-sales',
      label: 'In-store Sales',
      children: <InstoreSales />,
    },
  ];

  return (
    <div>
      <PageIntroBanner
        title="Sales"
        description="Make product sales and track sales performance here"
        actionButton={
          <div className="flex items-center gap-5">
            <Button
              className="rounded"
              size="large"
              onClick={() => navigate('/pos/sales/pause')}
            >
              Paused Sales
            </Button>

            <Button
              type="primary"
              className="rounded"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate('/pos/sales/create')}
            >
              New Sales
            </Button>
          </div>
        }
      />

      <div className="px-5 bg-white">
        <Tabs defaultActiveKey="all-sales" onChange={onChange} items={items} />
      </div>

      <ConfirmModal
        open={pauseSalesOpened}
        onCancel={() => setPauseSalesOpened(false)}
        onConfirm={() => console.log('confirm')}
      />
    </div>
  );
};

export default SalesHome;
