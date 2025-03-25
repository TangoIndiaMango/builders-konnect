import React from 'react';

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Slider } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const MainLayout: React.FC = () => (
  <Layout style={{ height: '100vh' }}>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className="bg-white"
    >
      <div className="" />
      <Menu
        defaultSelectedKeys={['4']}
        items={items}
        className="h-full pt-[10vh]"
      />
    </Sider>
    <Layout>
      <Header style={{ padding: 0, background: 'red' }} className="h-[10vh]" />
      <Content
        style={{ margin: '24px 16px 0', background: 'white', height: '100%' }}
        className="overflow-y-scroll"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          voluptas reiciendis expedita quos blanditiis modi illum sequi
          nesciunt, harum officia adipisci dicta quis eius nostrum eaque ut
          distinctio? Eaque placeat commodi inventore, dignissimos ad magnam
          velit voluptas explicabo, quaerat illo corrupti dolor sit ipsum
          doloremque rerum. Animi rem vero, sint ex porro nulla eius aut
          mollitia, at atque officiis ad molestias eveniet impedit numquam
          tempora nobis reprehenderit fugit sit deleniti distinctio quos
          dolores, placeat ducimus! Consequatur tempore sint reprehenderit quae?
          Fuga exercitationem vel, maiores reiciendis distinctio assumenda iusto
          magnam laborum mollitia enim eaque ratione dicta quasi voluptates
          obcaecati accusamus a tempora dolore! Cupiditate doloremque corrupti
          ab error provident odio modi! Voluptate nostrum itaque cum quas facere
          atque maiores iure aliquam, laborum sunt ipsa fugiat, libero sit
          tempora laboriosam. Eius debitis labore, rerum soluta ratione nam modi
          ea voluptatibus, quibusdam animi fugiat aliquid. Adipisci minima vero
          deleniti. Omnis eos consequuntur voluptate, numquam neque consectetur
          explicabo suscipit quia ut obcaecati facilis ea molestias accusamus
          est, quas possimus consequatur doloribus, repellat necessitatibus
          quam? Officia modi nesciunt dolores, iste nisi quidem commodi nam at
          saepe dolor corrupti molestiae neque, porro eos ullam, mollitia
          laudantium in adipisci accusamus. Culpa similique quasi porro totam
          nulla maxime rerum veniam inventore illo, modi deserunt libero optio
          atque pariatur aliquam nobis reiciendis magnam eveniet ex velit
          dolorum earum architecto adipisci a! Veritatis molestiae aliquam
          labore fugit nobis, enim libero perferendis distinctio deserunt
          voluptatibus non rerum, adipisci laudantium cupiditate repellendus
          quod maxime laborum odit corporis quasi possimus dicta ad! Quidem
          optio eaque nam repellendus ratione hic rem odit cumque mollitia
          quisquam et porro explicabo dolorem illo sequi, quibusdam suscipit
          veniam non asperiores quo, tempora unde culpa? Sed magnam eveniet
          velit cum aperiam beatae quis similique necessitatibus voluptatibus,
          doloribus quidem repellat sint ea magni quo est reprehenderit quae
          reiciendis commodi aliquam!
        </p>
        <Slider defaultValue={30} />
      </Content>
    </Layout>
  </Layout>
);

export default MainLayout;
