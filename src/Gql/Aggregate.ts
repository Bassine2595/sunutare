import gql from "graphql-tag";

export const EmployersCount = gql`
  query($workshopId: UUID!) {
    employers(condition: { workshopId: $workshopId }) {
      totalCount
    }
  }
`;

export const ServicesCount = gql`
  query($workshopId: UUID!) {
    services(condition: { workshopId: $workshopId }) {
      totalCount
    }
  }
`;

export const ModelesCount = gql`
  query($workshopId: UUID!) {
    modeles(condition: { workshopId: $workshopId }) {
      totalCount
    }
  }
`;

export const PRESSURERATE = gql`
  query($week: Datetime, $workshopId: UUID) {
    averageNumberOfServicesPerWeeks(condition: { workshopId: $workshopId }) {
      nodes {
        workshopId
        avg
      }
    }
    numberOfServiceToStartDuringWeeks(
      condition: { week: $week, workshopId: $workshopId }
    ) {
      nodes {
        week
        count
      }
    }
  }
`;

export const SERVICEDELIVEREDWITHIN7DAYS = gql`
  query($ends: Date!, $workshopId: UUID!) {
    services(
      filter: { dateFinish: { lessThanOrEqualTo: $ends } }
      condition: { workshopId: $workshopId }
    ) {
      totalCount
    }
  }
`;

export const NUMBEROFSERVICEPERDAYS = gql`
  query($workshopId: UUID) {
    all: numberOfServicePerDays(condition: { workshopId: $workshopId }) {
      nodes {
        count
        day
      }
    }
  }
`;

export const NUMBEROFSERVICEPERMONTHS = gql`
  query($workshopId: UUID) {
    all: numberOfServicePerMonths(condition: { workshopId: $workshopId }) {
      nodes {
        count
        month
      }
    }
  }
`;
