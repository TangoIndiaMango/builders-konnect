import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Tag, Typography } from 'antd';
import { SkeletonLoader } from '../../../components/common/SkeletonLoader';
import { getStatusColor } from '../../../../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';
import SalesOverview from '../../../components/profile/store/OrderDetails';
import { useFetchData } from '../../../../hooks/useApis';
import StoreDetailsnfo from '../../../components/profile/store/StoreDetailsnfo';
import { SingleStoreResponse } from '../types';
const SingleStoreDetails = () => {
  const { id } = useParams();
  const getSalesOrder =
    useFetchData(`merchants/locations/${id}?with_sales_overview=true
`);
  const singleSalesOrder = getSalesOrder?.data?.data as SingleStoreResponse;
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined onClick={() => navigate(-1)} />
          <Typography.Title level={4} className="!mb-0">
            View order
          </Typography.Title>

        </div>

        <div className="flex items-center justify-end gap-3">
          {/* <Select
            placeholder="Select order status"
            options={orderStatusOptions}
          /> */}

          <Button>Edit</Button>
        </div>
      </div>

      <div className="p-5 ">
        <div className="p-5 space-y-5 bg-white">
          <Typography.Title level={4}>{singleSalesOrder?.name} store</Typography.Title>
          <StoreDetailsnfo
            data={singleSalesOrder}
            isLoading={getSalesOrder.isLoading}
          />
          <SalesOverview
            data={singleSalesOrder}
            isLoading={getSalesOrder.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleStoreDetails;
