import React, { useContext } from "react";
import {
  Form,
  Input,
  Radio,
  Select,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Skeleton,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  MoneyCollectOutlined,
  UnorderedListOutlined,
  GlobalOutlined,
  LockOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import {
  MailRule,
  PasswordRule,
  ConfirmPasswordRule,
  RequiredRule,
  PhoneRule,
  PriceRule,
} from "../Rules";
import { UserContext } from "../Context";
import { EMPLOYERSBYWORKSHOPID, GETENUMLABELS } from "../../Gql/Query";
import { useQuery } from "@apollo/react-hooks";

export const FormItemMail = (props) => {
  const { disabled } = props;
  return (
    <Form.Item name="mail" rules={MailRule}>
      <Input
        prefix={<MailOutlined />}
        placeholder="E-mail"
        disabled={disabled}
      />
    </Form.Item>
  );
};

export const FormItemCodeEmployer = (props) => (
  <Form.Item name="codeEmployer" {...props} rules={RequiredRule}>
    <InputNumber placeholder="Code employé" style={{ width: "100%" }} />
  </Form.Item>
);

export const FormItemPassword = (props) => {
  const { confirm } = props;
  return (
    <Form.Item
      name={confirm ? "confirm" : "password"}
      rules={confirm ? ConfirmPasswordRule : PasswordRule}
    >
      <Input
        prefix={<LockOutlined />}
        type="password"
        placeholder={`${confirm ? "Confirmé" : ""} Mot de passe`}
      />
    </Form.Item>
  );
};

export const FormItemFirstName = (props) => {
  return (
    <Form.Item {...props} name="firstName" rules={RequiredRule}>
      <Input placeholder="Prénom" prefix={<UserOutlined />} />
    </Form.Item>
  );
};

export const FormItemGender = () => (
  <Form.Item name="gender" rules={RequiredRule}>
    <Radio.Group>
      <Radio value="M">Monsieur</Radio>
      <Radio value="F">Madame</Radio>
    </Radio.Group>
  </Form.Item>
);
export const FormItemLastName = (props) => {
  return (
    <Form.Item name="lastName" rules={RequiredRule} {...props}>
      <Input placeholder="Nom" prefix={<UserOutlined />} />
    </Form.Item>
  );
};

export const FormItemFullName = () => {
  return (
    <Row gutter={8}>
      <Col xs={24} md={12}>
        <FormItemFirstName />
      </Col>
      <Col xs={24} md={12}>
        <FormItemLastName />
      </Col>
    </Row>
  );
};

export const FormItemPhone = (props) => {
  return (
    <Form.Item {...props} name="phone" rules={PhoneRule}>
      <Input
        prefix={
          <span>
            <PhoneOutlined />
            <span>+221</span>
          </span>
        }
        placeholder="N° de téléphone"
      />
    </Form.Item>
  );
};

export const FormItemCode = (props) => {
  return (
    <Form.Item {...props} name="code">
      <Input placeholder="Votre code de service" prefix={<CodeOutlined />} />
    </Form.Item>
  );
};

export const FormItemCity = () => {
  const { data, loading } = useQuery(GETENUMLABELS, {
    variables: { enumName: "city" },
  });
  return (
    <Skeleton loading={loading}>
      <Form.Item name="city" rules={RequiredRule}>
        <Select
          options={data?.getEnumLabels.nodes.map((label) => ({
            label,
            value: label.trim().replace(" ", "_"),
          }))}
          placeholder={
            <span>
              <EnvironmentOutlined />
              <span>Ville *</span>
            </span>
          }
        />
      </Form.Item>
    </Skeleton>
  );
};

export const FormItemTypeModele = (props) => {
  const { data, loading } = useQuery(GETENUMLABELS, {
    variables: { enumName: "type_modele" },
  });
  const { noRule, ...rest } = props;
  return (
    <Skeleton loading={loading}>
      <Form.Item name="typeModele" rules={!noRule && RequiredRule} {...rest}>
        <Select
          allowClear
          options={data?.getEnumLabels.nodes.map((label) => ({
            label,
            value: label.trim().replace(" ", "_"),
          }))}
          placeholder={
            <span>
              <UnorderedListOutlined /> Type de modele
            </span>
          }
        />
      </Form.Item>
    </Skeleton>
  );
};

export const FormItemStreet = (props) => (
  <Form.Item {...props} name="street" rules={RequiredRule}>
    <Input placeholder="Adresse(*)" prefix={<EnvironmentOutlined />} />
  </Form.Item>
);

export const FormItemNumber = (props) => (
  <Form.Item {...props} name="number">
    <InputNumber min={0} placeholder="N° rue" style={{ width: "100%" }} />
  </Form.Item>
);

export const FormItemZip = (props) => (
  <Form.Item {...props} name="zip">
    <InputNumber min={0} placeholder="code postal" style={{ width: "100%" }} />
  </Form.Item>
);

export const FormItemAddress = () => (
  <Row gutter={8}>
    <Col md={6} xs={12}>
      <FormItemNumber />
    </Col>
    <Col md={12} xs={24}>
      <FormItemStreet />
    </Col>
    <Col md={6} xs={12}>
      <FormItemZip />
    </Col>
  </Row>
);

export const FormItemComment = (props) => (
  <Form.Item name="comment" {...props}>
    <Input placeholder="Plus de détaille" prefix={<InfoCircleOutlined />} />
  </Form.Item>
);

export const FormItemResponsable = (props) => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(EMPLOYERSBYWORKSHOPID, {
    variables: { workshopId: user.workshop.id, onlyfullname: true },
  });
  return (
    <Form.Item {...props} rules={RequiredRule} name="employers">
      <Select
        mode="multiple"
        clearIcon
        loading={loading}
        placeholder="Responsable"
        options={data?.employers.nodes.map(({ fullName, id }) => ({
          value: id,
          label: fullName,
        }))}
      />
    </Form.Item>
  );
};

export const FormItemSpeciality = (props) => {
  const { data, loading } = useQuery(GETENUMLABELS, {
    variables: { enumName: "speciality" },
  });
  return (
    <Skeleton loading={loading}>
      <Form.Item name="speciality" {...props} rules={RequiredRule}>
        <Select
          allowClear
          mode="multiple"
          placeholder={
            <span>
              <UnorderedListOutlined />
              <span> Spécialité</span>
            </span>
          }
          options={data?.getEnumLabels.nodes.map((label) => ({
            label,
            value: label.trim().replace(" ", "_"),
          }))}
        />
      </Form.Item>
    </Skeleton>
  );
};

export const FormItemCanner = (props) => {
  const { all, ...rest }: { all: boolean } = props;
  const { data, loading } = useQuery(GETENUMLABELS, {
    variables: { enumName: "canner" },
  });
  return (
    <Skeleton loading={loading}>
      <Form.Item name="canner" {...rest}>
        <Radio.Group buttonStyle="solid">
          {all && <Radio.Button value={undefined}>Tous</Radio.Button>}
          {data?.getEnumLabels.nodes.map((label) => (
            <Radio.Button key={label} value={label.trim().replace(" ", "_")}>
              {label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </Skeleton>
  );
};

export const FormItemContract = (props) => (
  <Form.Item name="contract" label="Type de contrat" {...props}>
    <Radio.Group>
      <Radio value="CDI">CDI</Radio>
      <Radio value="CDD">CDD</Radio>
      <Radio value="Non défini">Non défini</Radio>
    </Radio.Group>
  </Form.Item>
);

export const FormItemSlogan = (props) => (
  <Form.Item name="slogan" {...props}>
    <Input placeholder="Slogan" prefix={<TagsOutlined />} />
  </Form.Item>
);

export const FormItemSite = (props) => (
  <Form.Item name="site" {...props}>
    <Input placeholder="Site web" prefix={<GlobalOutlined />} />
  </Form.Item>
);

export const FormItemFixe = (props) => (
  <Form.Item name="fixe" {...props}>
    <Input
      placeholder="Fixe"
      prefix={
        <span>
          <PhoneOutlined />
          <span>+221</span>
        </span>
      }
    />
  </Form.Item>
);

export const FormItemPhoneFixe = () => (
  <Row gutter={8}>
    <Col xs={24} md={12}>
      <FormItemPhone />
    </Col>
    <Col xs={24} md={12}>
      <FormItemFixe />
    </Col>
  </Row>
);

export const FormItemName = (props) => (
  <Form.Item name="name" rules={RequiredRule} {...props}>
    <Input placeholder="Nom" />
  </Form.Item>
);

export const FormItemDescription = (props) => (
  <Form.Item name="description" {...props}>
    <Input
      type="text"
      placeholder="Description"
      prefix={<InfoCircleOutlined />}
    />
  </Form.Item>
);

export const FormItemTypeTissu = (props) => {
  const { data, loading } = useQuery(GETENUMLABELS, {
    variables: { enumName: "type_tissu" },
  });
  return (
    <Skeleton loading={loading}>
      <Form.Item name="typeTissu" rules={RequiredRule} {...props}>
        <Select
          options={data?.getEnumLabels.nodes.map((label) => ({
            label,
            value: label.trim().replace(" ", "_"),
          }))}
          placeholder="Type de tissu"
        />
      </Form.Item>
    </Skeleton>
  );
};

export const FormItemFullCost = (props) => (
  <Form.Item {...props} name="price" rules={[...RequiredRule, PriceRule]}>
    <Input
      suffix="CFA"
      prefix={<MoneyCollectOutlined />}
      placeholder="Montant du service"
    />
  </Form.Item>
);

export const FormItemAvance = (props) => (
  <Form.Item
    {...props}
    name="avance"
    dependencies={["price"]}
    rules={[
      ...RequiredRule,
      PriceRule,
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (parseFloat(getFieldValue("price")) > parseFloat(value)) {
            return Promise.resolve();
          }
          return Promise.reject(
            "Le montant du service doit etre supérieur au premier versement !"
          );
        },
      }),
    ]}
  >
    <Input
      placeholder="1er Versement"
      prefix={<MoneyCollectOutlined />}
      suffix="CFA"
    />
  </Form.Item>
);

export const FormItemPrice = () => (
  <Row gutter={8}>
    <Col xs={24} md={12}>
      <FormItemFullCost />
    </Col>
    <Col xs={24} md={12}>
      <FormItemAvance />
    </Col>
  </Row>
);

export const FormItemPaymentFinal = (props) => (
  <Form.Item name="paymentFinal" {...props}>
    <Input
      suffix="CFA"
      prefix={<MoneyCollectOutlined />}
      placeholder="Dernier versement"
    />
  </Form.Item>
);

export const FormItemDateBeginAndFinish = () => (
  <Row gutter={8}>
    <Col xs={24} md={12}>
      <FormItemDateBegin />
    </Col>
    <Col xs={24} md={12}>
      <FormItemDateFinish />
    </Col>
  </Row>
);

export const FormItemDateBegin = (props) => {
  return (
    <Form.Item {...props} name="dateBegin" rules={RequiredRule}>
      <DatePicker
        style={{ width: "100%" }}
        placeholder="Date début du service"
      />
    </Form.Item>
  );
};

export const FormItemDateFinish = (props) => {
  return (
    <Form.Item
      {...props}
      dependencies={["dateBegin"]}
      name="dateFinish"
      rules={[
        ...RequiredRule,
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (getFieldValue("dateBegin") < value) {
              return Promise.resolve();
            }
            return Promise.reject("Date invalide!");
          },
        }),
      ]}
    >
      <DatePicker style={{ width: "100%" }} placeholder="Date de retait" />
    </Form.Item>
  );
};
