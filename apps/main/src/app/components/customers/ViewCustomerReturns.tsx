import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, message, Tag, Typography } from 'antd';
import {useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import CustomerInformation from '../../components/returns/CustomerInfo';
import ActionConfirmModal from '../../components/returns/ActionConfirmMdal';
import ActionReasonModal from '../../components/returns/ActionReasonModal';
import { useFetchData, usePutData } from '../../../hooks/useApis';
import ReturnOrderDetails from '../../components/returns/ProductReturnsDetails';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';

const ViewCustomerReturns = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {data: returnDetailsData, isLoading: returnDetailsLoading } = useFetchData(`merchants/returns/${id}`)
  const {data: productDetailsData, isLoading: productDetailsLoading } = useFetchData(`merchants/inventory-products/${returnDetailsData?.data?.product_id}`)


  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className=' space-y-3'>
          <div className="flex items-center gap-3">
            <ArrowLeftOutlined onClick={() => navigate(-1)} />
            <Typography.Title level={4} className="!mb-0">
              View Returns and Refunds
            </Typography.Title>
            {/* <Tag color={returnDetailsData?.data?.status === 'pending' ? 'orange' : 'green'} className='capitalize'>{returnDetailsData?.data?.status}</Tag> */}
          </div>
          <p>View and manage customer details and all customer related issues.</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-6">
        <SkeletonLoader active={returnDetailsLoading || productDetailsLoading} type="card" hasHeader className="p-5">
          <ReturnOrderDetails returnOrderData={returnDetailsData?.data} productImages={productDetailsData?.data?.media} />
        </SkeletonLoader>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerReturns;
