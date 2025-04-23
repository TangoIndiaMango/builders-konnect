import { ArrowLeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationBackProps {
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
}

const NavigationBack = ({
  title,
  description,
  actionButton,
}: NavigationBackProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
      <div>
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined onClick={() => navigate(-1)} />
          <Typography.Title level={4} className="!mb-0">
            {title}
          </Typography.Title>
        </div>
        {description && (
          <Typography.Text className="text-gray-500">
            {description}
          </Typography.Text>
        )}
      </div>

      {actionButton && actionButton}
    </div>
  );
};

export default NavigationBack;
