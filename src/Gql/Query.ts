import gql from "graphql-tag";

export const CURRENTUSER = gql`
  {
    currentUser {
      id
      firstName
      lastName
      phone
      mail
      gender
      isActive
      isEmployer
      workshop: workshopById {
        slogan
        site
        phone
        name
        mail
        id
        fixe
        speciality
        createdAt
        address {
          city
          comment
          nodeId
          number
          street
          id
        }
      }
    }
  }
`;

export const MODELES = gql`
  query($workshopId: UUID, $typeModele: TypeModele, $canner: Canner) {
    modeles(
      condition: {
        workshopId: $workshopId
        typeModele: $typeModele
        canner: $canner
      }
    ) {
      nodes {
        id
        canner
        typeModele
        imageFile
        name
        description
      }
    }
  }
`;

export const MESSAGEBYSUBJECT = gql`
  query($subject: String!) {
    messages(condition: { subject: $subject, isCustomised: false }) {
      nodes {
        message
        id
      }
    }
  }
`;

export const MODELE = gql`
  query($id: UUID!) {
    modele(id: $id) {
      canner
      id
      imageFile
      name
      createdAt
    }
  }
`;

export const CURRENTUSERID = gql`
  query {
    id: currentUserId
  }
`;

export const EMPLOYERSBYWORKSHOPID = gql`
  query($workshopId: UUID!, $onlyfullname: Boolean = false) {
    employers(condition: { workshopId: $workshopId }) {
      nodes {
        fullName
        id
        phone @skip(if: $onlyfullname)
        mail @skip(if: $onlyfullname)
        contract @skip(if: $onlyfullname)
        city @skip(if: $onlyfullname)
        comment @skip(if: $onlyfullname)
        number @skip(if: $onlyfullname)
        street @skip(if: $onlyfullname)
        zip @skip(if: $onlyfullname)
      }
    }
  }
`;

export const SERVICES = gql`
  query(
    $workshopId: UUID!
    $isCut: Boolean
    $isDelivered: Boolean
    $isOver: Boolean
    $isStarded: Boolean
  ) {
    services(
      condition: {
        workshopId: $workshopId
        isCut: $isCut
        isDelivered: $isDelivered
        isOver: $isOver
        isStarded: $isStarded
      }
      orderBy: CREATED_AT_DESC
    ) {
      nodes {
        id
        avance
        createdAt
        comment
        dateBegin
        dateFinish
        price
        typeTissu
        code
        isCut
        isOver
        isStarded
        progress
        imageFile
        modele {
          imageFile
          name
        }
      }
    }
  }
`;

export const SERVICE = gql`
  query($id: UUID!) {
    service(id: $id) {
      avance
      comment
      createdAt
      dateBegin
      dateFinish
      imageFile
      modele {
        imageFile
        name
        canner
        description
      }
      customer {
        fullName
        phone
        mail
        id
      }
      measure {
        breasts
        createdAt
        hips
        id
        length
        longSleeve
        lowsLeeve
        pants
        width
      }
      employes: employersByServiceId {
        nodes {
          fullName
        }
      }
    }
  }
`;

export const SERVICEBYDATE = gql`
  query(
    $dateFinish: Date
    $dateBegin: Date
    $isStarded: Boolean
    $workshopId: UUID!
  ) {
    services(
      condition: {
        dateFinish: $dateFinish
        dateBegin: $dateBegin
        workshopId: $workshopId
        isStarded: $isStarded
      }
      orderBy: CREATED_AT_ASC
    ) {
      nodes {
        imageFile
        id
        avance
        code
        comment
        dateFinish
        dateBegin
        typeTissu
        price
        employers: employersByServiceId {
          nodes {
            firstName
            gender
            id
            lastName
          }
        }
        modele {
          imageFile
        }
        isCut
        isDelivered
        isOver
        isStarded
        progress
      }
    }
  }
`;

export const SERVICEBYCODE = gql`
  query($code: Int!) {
    serviceByCode(code: $code) {
      avance
      comment
      createdAt
      dateBegin
      dateFinish
      id
      imageFile
      isDelivered
      modeleId
      nbStart
      nodeId
      price
      typeTissu
      updateAt
      workshopId
      isCut
      isOver
      isStarded
    }
  }
`;

export const SERVICESBYEMPLOYER = gql`
  query($workshopId: UUID!, $employerId: UUID!) {
    services: servicesByEmployers(
      condition: { workshopId: $workshopId, employerId: $employerId }
    ) {
      nodes {
        dateBegin
        employerId
        id
        imageFile
        progress
        workshopId
      }
    }
  }
`;

export const SERVICEBYNODEID = gql`
  query($nodeId: ID!) {
    serviceByNodeId(nodeId: $nodeId) {
      id
      dateBegin
      dateFinish
      progress
      isCut
      isDelivered
      isOver
      isStarded
      createdAt
      code
    }
  }
`;

export const SERVICEBYMONTH = gql`
  query($month: Datetime!, $workshopId: UUID!) {
    services: servicesByMonths(
      condition: { month: $month, workshopId: $workshopId }
    ) {
      nodes {
        dateBegin
        dateFinish
        imageFile
        id
        month
        progress
      }
    }
  }
`;

export const GETENUMLABELS = gql`
  query($enumName: String!) {
    getEnumLabels(enumName: $enumName) {
      nodes
    }
  }
`;

export const NOTIFICATIONS = gql`
  query($workshopId: UUID!, $onlyTotalCount: Boolean = true) {
    notifications(condition: { isProcessed: false, workshopId: $workshopId }) {
      totalCount
      nodes @skip(if: $onlyTotalCount) {
        createdAt
        customerId
        customersFullName
        id
        isProcessed
        message
        messageId
        serviceId
        subject
        typeNotification
        workshopId
      }
    }
  }
`;

export const CUSTOMERSBYWORKSHOPID = gql`
  query(
    $workshopId: UUID!
    $all: Boolean = false
    $year: Datetime
    $like: String = ""
  ) {
    customers: customersWorkshops(
      condition: { workshopId: $workshopId, year: $year }
      orderBy: COUNT_DESC
      filter: { fullName: { includesInsensitive: $like } }
    ) {
      nodes {
        addressId @include(if: $all)
        city @include(if: $all)
        fullName
        mail @include(if: $all)
        gender @include(if: $all)
        firstName @include(if: $all)
        lastName @include(if: $all)
        phone
        street @include(if: $all)
        zip @include(if: $all)
        id
        count @include(if: $all)
      }
    }
    numberServicesByYears(condition: { workshopId: $workshopId, year: $year })
      @include(if: $all) {
      nodes {
        count
      }
    }
  }
`;
