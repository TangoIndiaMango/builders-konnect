import {
  useFetchData,
  useCreateData,
  usePutData,
} from '../../../hooks/useApis';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Typography, Form, Input, Checkbox, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';

interface Permission {
  id: number;
  name: string;
}

interface RoleFormValues {
  name: string;
  description: string;
  permissions: number[] | 'all';
}

const AddRole = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: permissionsData, isLoading } = useFetchData(
    'merchants/roles/permissions/all?paginate=0'
  );
  const createRole = useCreateData('merchants/roles');
  const updateRole = usePutData(`merchants/roles/${id}`);
  const viewRole = useFetchData(`merchants/roles/${id}`);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const permissions = (permissionsData?.data as Permission[]) || [];
  const [form] = Form.useForm<RoleFormValues>();
  useEffect(() => {
    if (id && viewRole?.data?.data) {
      form.setFieldsValue({
        ...viewRole?.data?.data,
        permissions:
          viewRole?.data?.data?.permissions === 'all'
            ? 'all'
            : viewRole?.data?.data?.permissions?.map((permission) => Number(permission.id)),
      });
      setSelectedPermissions(viewRole?.data?.data?.permissions?.map((permission) => Number(permission.id)) || []);
    }
  }, [id, viewRole?.data?.data]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const allPermissionIds = permissions.map((p) => p.id);
    setSelectedPermissions(checked ? allPermissionIds : []);
    form.setFieldValue('permissions', checked ? 'all' : []);
  };

  const handlePermissionChange = (permissionId: number) => {
    const updatedPermissions = selectedPermissions.includes(permissionId)
      ? selectedPermissions.filter((id) => id !== permissionId)
      : [...selectedPermissions, permissionId];

    setSelectedPermissions(updatedPermissions);
    setSelectAll(updatedPermissions.length === permissions.length);
    form.setFieldValue(
      'permissions',
      updatedPermissions.length === permissions.length
        ? 'all'
        : updatedPermissions
    );
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (id) {
        await updateRole.mutateAsync({
          ...values,
          permissions: selectAll ? 'all' : selectedPermissions,
        });
      } else {
        await createRole.mutateAsync({
          ...values,
          permissions: selectAll ? 'all' : selectedPermissions,
        });
      }
      message.success('Role created successfully');
      navigate(-1);
    } catch (error) {
      message.error('Failed to create role');
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5 p-5 bg-white">
        <div className="flex items-center gap-3">
          <ArrowLeftOutlined
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <Typography.Title level={4} className="!mb-0">
            {id ? 'Edit Role' : 'Add New Role'}
          </Typography.Title>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={createRole.isLoading}
          >
            {id ? 'Update Role' : 'Add Role'}
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="p-6 bg-white rounded-md">
          <Form
            form={form}
            layout="horizontal"
            requiredMark={false}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 14 }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter role name' }]}
            >
              <Input
                placeholder="Enter name"
                size="large"
                className="rounded"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea
                placeholder="Enter description"
                size="large"
                className="rounded"
                rows={3}
              />
            </Form.Item>

            <Form.Item
              label="Permissions"
              name="permissions"
              rules={[
                {
                  required: true,
                  message: 'Please select at least one permission',
                },
              ]}
            >
              <div className="space-y-4">
                {/* All Features Checkbox */}
                <Checkbox
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="font-medium"
                >
                  All Features
                </Checkbox>

                {/* Permissions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                  <SkeletonLoader
                    active={isLoading}
                    type="table"
                    columns={2}
                    rows={5}
                  >
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-start min-w-0 gap-2"
                      >
                        <Checkbox
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                          className="flex-shrink-0 mt-1"
                        />
                        <span className="flex-1 text-sm break-all">
                          {permission.name}
                        </span>
                      </div>
                    ))}
                  </SkeletonLoader>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
