import { Empty, Button } from 'antd';
import type { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:"center" }}
    >
      <Empty description="Page Not Found" />
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={() => (window.location.href = '/')}
      >
        Return Home
      </Button>
    </div>
  );
};

export default NotFound;
