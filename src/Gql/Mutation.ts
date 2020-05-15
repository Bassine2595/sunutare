import gql from "graphql-tag";

export const CREATEADDRESS = gql`
  mutation($address: AddressInput!) {
    address: createAddress(input: { address: $address }) {
      address {
        id
      }
    }
  }
`;

export const ACTIVEUSER = gql`
  mutation($id: UUID!) {
    updateUser(input: { patch: { isActive: true }, id: $id }) {
      clientMutationId
    }
  }
`;

export const CREATEWORKSHOP = gql`
  mutation($addWorkshop: AddWorkshopInput!) {
    __typename
    addWorkshop(input: $addWorkshop) {
      clientMutationId
    }
  }
`;

export const LOGIN = gql`
  mutation($mail: String!, $password: String!) {
    login(input: { password: $password, mail: $mail }) {
      jwtToken
    }
  }
`;

export const REGISTER = gql`
  mutation($input: RegisterInput!) {
    register(input: $input) {
      jwtToken
    }
  }
`;

export const ADDALERT = gql`
  mutation($input: AddAlertInput!) {
    __typename
    addAlert(input: $input) {
      clientMutationId
    }
  }
`;

export const GENERATETOKEN = gql`
  mutation($mail: String!) {
    token: generateToken(input: { mail: $mail }) {
      jwtToken
    }
  }
`;

export const UPDATEADDRESS = gql`
  mutation($id: UUID!, $patch: AddressPatch!) {
    updateAddress(input: { patch: $patch, id: $id }) {
      address {
        id
      }
    }
  }
`;
export const UPDATEPROFILL = gql`
  mutation($id: UUID!, $phone: String, $firstName: String, $lastName: String) {
    updateUser(
      input: {
        patch: { phone: $phone, lastName: $lastName, firstName: $firstName }
        id: $id
      }
    ) {
      clientMutationId
    }
  }
`;

export const UPDATEPASSWORD = gql`
  mutation($id: UUID!, $password: String!) {
    updateUser(input: { patch: { password: $password }, id: $id }) {
      clientMutationId
    }
  }
`;

export const UPDATEWORKSHOP = gql`
  mutation($id: UUID!, $patch: WorkshopPatch!) {
    updateWorkshop(input: { patch: $patch, id: $id }) {
      clientMutationId
    }
  }
`;

export const ADDSERVICE = gql`
  mutation($input: AddServiceInput!) {
    __typename
    addService(input: $input) {
      code: integer
    }
  }
`;

export const UPDATESERVICE = gql`
  mutation($id: UUID!, $patch: ServicePatch!) {
    __typename
    updateService(input: { patch: $patch, id: $id }) {
      clientMutationId
    }
  }
`;

export const UPDATESERVICEBYCODE = gql`
  mutation($code: Int!, $patch: ServicePatch!) {
    __typename
    updateServiceByCode(input: { patch: $patch, code: $code }) {
      clientMutationId
    }
  }
`;

export const CREATEMODELE = gql`
  mutation($modele: ModeleInput!) {
    __typename
    createModele(input: { modele: $modele }) {
      modele {
        id
      }
    }
  }
`;

export const CHECKPASSWORD = gql`
  mutation($password: String!, $id: UUID!) {
    __typename
    checkPassword(input: { password: $password, id: $id }) {
      jwtToken
    }
  }
`;

export const UPDATEMODELE = gql`
  mutation($id: UUID!, $patch: ModelePatch!) {
    __typename
    updateModele(input: { patch: $patch, id: $id }) {
      clientMutationId
    }
  }
`;

export const DELETEMODELE = gql`
  mutation($id: UUID!) {
    __typename
    deleteModele(input: { id: $id }) {
      clientMutationId
    }
  }
`;

export const FORGETPASSWORD = gql`
  mutation($mail: String!) {
    __typename
    token: forgetPassword(input: { mail: $mail }) {
      jwtToken
    }
  }
`;

export const CREATEMEASURE = gql`
  mutation($measure: MeasureInput!) {
    __typename
    createMeasure(input: { measure: $measure }) {
      measure {
        id
        breasts
        hips
        length
        longSleeve
        lowsLeeve
        pants
        width
      }
    }
  }
`;

export const UPDATEMEASURE = gql`
  mutation($id: UUID!, $patch: MeasurePatch!) {
    updateMeasure(input: { patch: $patch, id: $id }) {
      measure {
        id
        breasts
        createdAt
        hips
        length
        longSleeve
        lowsLeeve
        updateAt
        width
        belt
        pants
      }
    }
  }
`;

export const CREATEEMPLOYER = gql`
  mutation($input: AddEmployerInput!) {
    __typename
    addEmployer(input: $input) {
      code: integer
    }
  }
`;

export const CUSTOMEREXIST = gql`
  mutation($phone: String!, $mail: String) {
    __typename
    customerExist(input: { phone: $phone, mail: $mail }) {
      exist: boolean
    }
  }
`;

export const EMPLOYEREXIST = gql`
  mutation($phone: String!, $mail: String) {
    __typename
    employerExist(input: { phone: $phone, mail: $mail }) {
      exist: boolean
    }
  }
`;

export const MATCHSERVICEEMPLOYER = gql`
  mutation($codeService: Int!, $codeEmployer: Int!) {
    __typename
    matchServiceEmployer(
      input: { codeService: $codeService, codeEmployer: $codeEmployer }
    ) {
      match: boolean
    }
  }
`;
export const UPDATEEMPLOYER = gql`
  mutation($id: UUID!, $patch: ModelePatch!) {
    __typename
    updateEmployer(input: { patch: $patch, id: $id }) {
      clientMutationId
    }
  }
`;
