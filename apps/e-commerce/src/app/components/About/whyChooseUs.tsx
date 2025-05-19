import { Row, Col, Card, Typography } from 'antd';
import { features } from '../../lib/Constants';

const { Title, Paragraph } = Typography;

export default function WhyChooseSection() {
  return (
    <div className="py-16">
      <div className="mb-8 flex items-center">
        <div className="w-1.5 h-8 bg-red-600 mr-4"></div>
        <Title level={2} style={{ margin: 0, color: '#000000D9' }}>
          Why Choose Builder&apos;s Konnect?
        </Title>
      </div>

      <Row gutter={[24, 24]}>
        {features.map((feature, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Card
              hoverable
              bordered
              className="rounded-md h-full"
              style={{ borderColor: '#BFBFBF', padding: '24px' }}
            >
              <div className="mb-4">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  style={{ width: 40, objectFit: 'contain' }}
                />
              </div>

              <Title level={4} className="" style={{ color: '#000000D9' }}>
                {feature.title}
              </Title>
              <Paragraph
                style={{ color: '#00000073', fontSize: 14, lineHeight: '24px' }}
              >
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
